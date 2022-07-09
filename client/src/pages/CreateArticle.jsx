import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import NewArticleForm from "../components/NewArticleForm";
import "../styles/newarticle.scss"

function CreateArticle(){
    const params = useParams()

    return(
       <section>
            <Navbar />
            <NewArticleForm userId={params.id}/>
       </section>
    )
}

export default CreateArticle;