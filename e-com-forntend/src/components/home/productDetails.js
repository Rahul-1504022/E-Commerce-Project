import { useEffect, useState } from 'react';
import Layout from '../Layout';
import { API } from '../../utils/config';
import { Link, useParams } from 'react-router-dom';
import { getProductDetails } from '../../api/apiProduct';
import { showSuccess, showError } from '../../utils/messages';
import { addToCart } from '../../api/apiOrder';
import { isAuthnticated, userInfo } from '../../utils/auth';

const ProductDetails = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [photoUrl, setphotoUrl] = useState(`${API}/product/photo/`);
    const { id } = useParams();


    useEffect(() => {
        getProductDetails(id)
            .then(response => {
                return setProduct(response.data)
            })
            .catch(err => setError("Failed to load products"))
    }, [])

    const handleAddToCart = product => () => {
        if (isAuthnticated()) {
            setError(false);
            setSuccess(false);
            const user = userInfo();
            const cartItem = {
                user: user._id,
                product: product._id,
                price: product.price,
            }
            addToCart(user.token, cartItem)
                .then(response => setSuccess(true))
                .catch(error => {
                    if (error.response) {
                        setError(error.response.data);
                    } else {
                        setError("Add to cart failed!");
                    }
                })
        } else {
            setSuccess(false);
            setError("Please login first!");
        }
    }

    return (
        <Layout title="Product Page">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/home">Home</Link></li>
                    <li class="breadcrumb-item"><a href="#">Product</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{product.category ? product.category.name : ""}</li>
                </ol>
            </nav>
            <div>
                {showSuccess(success, 'Item Added to Cart!')}
                {showError(error, error)}
            </div>
            <div className="row container">
                <div className="col-6">
                    <img
                        src={`${photoUrl}${product._id}`}
                        alt={product.name}
                        width="100%"
                    />
                </div>
                <div className="col-6">
                    <h3>{product.name}</h3>
                    <span style={{ fontSize: 20 }}>&#2547;</span>{product.price}
                    <p>{product.quantity ? <span className="badge badge-pill badge-primary" style={{ color: "green" }}>In Stock</span> : <span className="badge badge-pill badge-danger" style={{ color: "red" }}>Out of Stock</span>}</p>
                    <p>{product.description}</p>
                    {product.quantity ? <>
                        &nbsp;<button className="btn btn-outline-primary btn-md" onClick={handleAddToCart(product)}>Add to Cart</button>
                    </> : ""}
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails;