import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
    const [search, setSearch] = useState("");
    const [foodItems, setFoodItems] = useState([]);
    const [categoryItems, setCategoryItems] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:4000/api/displaydata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response = await response.json();
        setFoodItems(response[0]);
        setCategoryItems(response[1]);
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <div>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div class="carousel-caption" style={{ zIndex: "10" }}>
                            <div class="d-flex justify-content-center">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900*700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900*700/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900*700/?icecream" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>
                {
                    categoryItems !== [] ?
                        categoryItems.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className="fs-3 m-3">
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {
                                        foodItems !== [] ?
                                            foodItems.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))) // search bhi handle ho jaayega
                                                .map((filterItems) => {
                                                    return (
                                                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                                            <Card foodItem = {filterItems}
                                                                options={filterItems.options[0]}/>
                                                        </div>
                                                    )
                                                })
                                            : <div>No such data found</div>
                                    }
                                </div>
                            )
                        })
                        : ""

                }
            </div>
            <div><Footer /></div>
        </div>
    )
}
