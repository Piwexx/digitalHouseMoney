import Header from "@/ui/home/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
   <>
      <Header/>
      <main className="bg-secondary-color">
          {children}
      </main>
   </>
  );
}