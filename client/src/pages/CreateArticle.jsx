import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewArticleForm from "../components/NewArticleForm";
import "../styles/newarticle.scss"

function CreateArticle(){
    const params = useParams()

    return(
       <section>
            <Navbar />
            <NewArticleForm userId={params.id}/>
            <Footer/>
       </section>
    )
}

export default CreateArticle;