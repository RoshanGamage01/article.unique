import { useParams } from "react-router-dom"
import EditArticleForm from "../components/EditArticleForm"
import Navbar from "../components/Navbar"
import "../styles/edit_article.scss"

function EditArticle(){
    const params = useParams()

    return (
        <section>
            <Navbar /> 
            <EditArticleForm id={params.id}/>
        </section>
    )
}

export default EditArticle