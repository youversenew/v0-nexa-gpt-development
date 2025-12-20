// lib/supabase/middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // 1. Dastlabki response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Supabase klientini yaratamiz (ANON KEY bilan)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // O'ZGARTIRILDI: Faqat ANON KEY
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Cookielarni requestga yozamiz
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          
          // Responseni yangilaymiz
          response = NextResponse.next({
            request,
          });

          // Cookielarni responsega ham yozamiz
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // 3. Foydalanuvchini tekshiramiz
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 4. Himoyalangan yo'llar
  const protectedPaths = ["/chat", "/settings", "/account"];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 5. Auth sahifalari (Login/Signup)
  const authPaths = ["/login", "/signup"];
  const isAuthPath = authPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isAuthPath && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/chat";
    return NextResponse.redirect(url);
  }

  return response;
}