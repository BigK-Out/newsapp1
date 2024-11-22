"use client"


import React, { useState, useEffect} from 'react'

export const initialState = {
    title: "",
    img: "",
    category: "",
    author: "",
    brief: "",
    validate: "",
}
export default function CreatePostItem() {
    

    const [text, setText] = useState(initialState);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setText({...text, [name]: value, validate: ""})
    };

    const handleFormSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if (text.title==="" || text.img===""|| text.category ===""|| text.brief===""){
            setText({...text, validate:"incomplete"})
            return;
        }

        try {
            const response = await fetch("/api/postitems",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(text)
            })

            setText({...text, validate: "Loading"})
            
            const result = response.status

            if(result===201){
                setText({...text, validate: "success"});
                console.log("Success", result)
            }
        } catch (error) {
            setText({...text, validate: "error"});
            console.log("Error", error)
        }
    }
  return (
    <main id="main">
        <section className="create-post-content">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-10">
                        <div className='row d-flex justify-content-center mt-5'>
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-12 text-center mb-5">
                                        <h1 className='page-title'>Create New Post</h1>
                                    </div>
                                </div>
                                <form onSubmit={handleFormSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <label>Title</label>
                                            <input type="text" name='title' value={text.title} onChange={handleTextChange} className='form-control' placeholder='Enter Title' />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <label>Image URL</label>
                                            <input type="text" name='img' value={text.img} onChange={handleTextChange} className='form-control' placeholder='Enter Img URL' />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <label>Category</label>
                                            <input type="text" name='category' value={text.category} onChange={handleTextChange} className='form-control' placeholder='Enter Category' />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <label>Author</label>
                                            <input type="text" name='author' value={text.author} onChange={handleTextChange} className='form-control' placeholder="Enter Author's Name" />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label>Brief</label>
                                            <textarea className="form-control" value={text.brief} onChange={handleTextChange} name="brief" cols={30} rows={10} placeholder='Enter Post Brief'></textarea>
                                        </div>
                                        <div className="mb-3">
                                            {text.validate === 'loading' && (
                                                <div className="loading">Sending Post</div>
                                            )}
                                            {text.validate === 'incomplete' && (
                                                <div className="error-message">
                                                    Please fill in all above details.
                                                </div>
                                            )}
                                            {text.validate === 'success' && (
                                                <div className="sent-message">
                                                    Your news was posted successfully. Thank you!
                                                </div>
                                            )}
                                            {text.validate === 'error' && (
                                                <div className="error-message">Server Error</div>
                                            )}
                                        </div>
                                        <div className='col-12 d-flex justify-content-center'>
                                            <input type="submit" className='btn btn-primary' value="Post Item" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}
