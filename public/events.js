// const { response } = require("express");

window.addEventListener("DOMContentLoaded", (event) => {
    let img = document.getElementsByClassName("cat-pic")[0];
    fetch("/kitten/image")
        .then(res => { 
            if (!res.ok) {
                throw res
            }
            return res.json()
        })
        .then(data => {
            img.setAttribute("src", data.src)
        })
        .catch( e => {
            e.json()
                .then((e) => {
                    alert(`${e.message}`)
                }) 
        })

    const imgButton = document.getElementById("new-pic");

    imgButton.addEventListener("click", e => {
        fetch("/kitten/image")
            .then(res => {
                if (!res.ok) {
                    throw Error(res.message)
                }
                return res.json()
            })
            .then(data => {
                img.setAttribute("src", data.src)
            })
            .catch (e => {
                alert(e)
            })
    })

    const upvote = document.getElementById("upvote");

    upvote.addEventListener("click", (e) => {
        let score = document.getElementsByClassName("score")[0];

        fetch("/kitten/upvote", { method: "PATCH"} )
            .then(res => res.json())
            .then(data => score.innerHTML = data.score)
    })

    const downvote = document.getElementById("downvote");

    downvote.addEventListener("click", (e) => {
        let score = document.getElementsByClassName("score")[0];

        fetch("/kitten/downvote", { method: "PATCH"} )
            .then(res => res.json())
            .then(data => score.innerHTML = data.score)
    })

    const formSubmit = document.getElementsByClassName("comment-form")[0]
    const inputField = document.getElementById("user-comment");
    const commentDiv = document.getElementsByClassName("comments")[0]

    document.addEventListener("submit", e => {
        e.preventDefault()
        commentDiv.innerHTML = ""
        fetch("/kitten/comments", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:
                JSON.stringify({comment: `${inputField.value}` })
        })
            .then(res => res.json())
            .then(comments => {
                comments.comments.forEach( comment => {
                    let newComment = document.createElement("div")
                    newComment.innerHTML = comment
                    commentDiv.appendChild(newComment)
                } )
            })
        


    })
})