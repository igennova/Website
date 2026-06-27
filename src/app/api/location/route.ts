import { NextResponse } from "next/server";

interface IpWhoResponse {
  success: boolean;
  city?: string;
  region?: string;
  country?: string;
  country_code?: string;
}

export async function GET(request: Request) {
  const headers = request.headers;

  const vercelCity = headers.get("x-vercel-ip-city");
  const vercelCountry = headers.get("x-vercel-ip-country");
  const vercelRegion = headers.get("x-vercel-ip-country-region");

  if (vercelCity && vercelCountry) {
    return NextResponse.json({
      city: decodeURIComponent(vercelCity),
      region: vercelRegion ? decodeURIComponent(vercelRegion) : null,
      country: vercelCountry,
    });
  }

  const forwarded = headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  const lookupUrl = ip ? `https://ipwho.is/${ip}` : "https://ipwho.is/";

  try {
    const res = await fetch(lookupUrl, { next: { revalidate: 86400 } });
    if (!res.ok) return NextResponse.json(null, { status: 404 });

    const data: IpWhoResponse = await res.json();
    if (!data.success || !data.city) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json({
      city: data.city,
      region: data.region ?? null,
      country: data.country ?? data.country_code ?? "",
    });
  } catch {
    return NextResponse.json(null, { status: 404 });
  }
}
