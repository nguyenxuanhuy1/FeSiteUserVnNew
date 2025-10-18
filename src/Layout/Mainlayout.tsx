
import FloatingContact from "../Page/Components/BtnContact/BtnContac";
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
        <FloatingContact/>
        <Footer/>
    </div>
  );
};

export default MainLayout;
