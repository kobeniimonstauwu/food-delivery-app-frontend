import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

//rfcp is used for creating components as a shortcut
type Props = {
  children : React.ReactNode;
  showHero? : boolean
};

const Layout = ({children, showHero = false}: Props) => {
  return(
  // the children contains the components needed here
  <div className="flex flex-col min-h-screen">
    <Header />
    {/* It will display hero if true, and none if false */}
    { showHero && <Hero />}
    {/* Makes sure that both these Header and the Div are separated */}
    <div className="container mx-auto flex-1 py-10">{children}</div>
    <Footer />
  </div> // Takes the whole height in the screen
  );
    
};

export default Layout;