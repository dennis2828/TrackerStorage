import Container from "@/components/Container";
import Footer from "@/components/Footer";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
      {children}
      </div>
        <Container>
          <Footer />
        </Container>
    </div>
  );
}