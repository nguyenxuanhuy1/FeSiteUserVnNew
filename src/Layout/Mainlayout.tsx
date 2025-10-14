
import Footer from "./Footer/Footer";
import Header from "./index";
interface LayOutMainProp {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayOutMainProp> = ({ children }) => {
  return (
    <div>
        <Header />
          <div> 
            {children}
        </div>
        <Footer/>
    </div>
  );
};

export default MainLayout;
