import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import AdminLayout from "@/components/admin/AdminLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith("/admin");

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} font-sans`}
    >
      <AuthProvider>
        <CartProvider>
          {isAdmin ? (
            <AdminLayout>
              <Component {...pageProps} />
            </AdminLayout>
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </CartProvider>
      </AuthProvider>
    </div>
  );
}
