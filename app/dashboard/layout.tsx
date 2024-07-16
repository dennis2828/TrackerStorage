import Container from "@/components/Container";
import Footer from "@/components/Footer";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        {children}
        <Container>
          <div className="mt-14"></div>
          <Footer />
        </Container>
    </>
  );
}
