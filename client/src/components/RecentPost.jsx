import "../styles/recent-article.scss"
import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

function RecentPost(){
    const [data, setData] = useState({title: 'Loading..', description: 'Loading..', image: 'test', _id: 'test'})

    useEffect(()=>{
        axios.get("https://article-unique.herokuapp.com/api/article/post/recent")
            .then(response => {
                setData(response.data)
            })
    }, [])

    return(
        <section>
            <div className="recent-article" style={{backgroundImage: `linear-gradient(rgba(0 0 0 / 25%), rgba(0 0 0 / 25%)), url(${data.image})`}}>
                <div className="title">{data.title}</div>
                <div className="desc">{data.description.slice(0, 100)}...Read more...</div>
                <Link to={"/article/"+data._id} className="btn">Read full article</Link>
            </div>
        </section>
    )
}

export default RecentPost;