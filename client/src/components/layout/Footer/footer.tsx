"use client"

import Link from "next/link"
import Image from "next/image"
import { Logo } from "@/components/navbar-01/logo"

const links = [
  {
    title: "الصفحات",
    items: [
      { title: "الرئيسية", href: "/" },
      { title: "المدونة", href: "/blog" },
      { title: "من نحن", href: "/about" },
      { title: "تواصل معنا", href: "/contact" },
    ],
  },
  {
    title: "الخدمات",
    items: [
      { title: "عقار الرياض", href: "/riyadh" },
      { title: "عقار جدة", href: "/jeddah" },
      { title: "عقار مكة", href: "/makkah" },
      { title: "عقار الدمام", href: "/dammam" },
    ],
  },
]

export default function FooterSection() {
  return (
    <footer
      dir="rtl"
      className="border-t bg-[#FAFAFA] text-zinc-700"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        تذييل الموقع
      </h2>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Logo + About */}
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="الصفحة الرئيسية" className="block w-fit">
              <Logo />
            </Link>

            {/* Certificates / Trust Badges */}
            <Image
              src="/certificates.png" // 👈 استبدل بالصورة الحقيقية
              alt="شهادات الاعتماد والجودة"
              width={180}
              height={60}
              className="opacity-90 hover:opacity-100 transition"
              priority
            />

            <p className="text-sm text-zinc-600 leading-relaxed max-w-xs">
              وصلة — منصتك الذكية للربط بينك وبين أفضل العروض والخدمات العقارية. نلتزم
              بتقديم تجربة موثوقة وسهلة الاستخدام.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="روابط هامة" className="md:col-span-2 grid grid-cols-2 gap-8">
            {links.map((group, i) => (
              <div key={i} className="space-y-4 text-sm">
                <h3 className="font-semibold text-zinc-900">{group.title}</h3>
                <ul className="space-y-2">
                  {group.items.map((item, j) => (
                    <li key={j}>
                      <Link
                        href={item.href}
                        className="text-zinc-600 hover:text-zinc-900 transition-colors"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-zinc-200" />

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <span className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} وصلة — جميع الحقوق محفوظة
          </span>
          <nav aria-label="روابط قانونية">
            <ul className="flex gap-6 text-sm">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-zinc-900 text-zinc-600 transition-colors"
                >
                  الشروط
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-zinc-900 text-zinc-600 transition-colors"
                >
                  الخصوصية
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
