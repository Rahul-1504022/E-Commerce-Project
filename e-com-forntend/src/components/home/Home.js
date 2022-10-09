import { useState, useEffect } from 'react';
import Layout from '../Layout';
import Card from './Card';
import { showError, showSuccess } from '../../utils/messages';
import { getCategories, getProducts, getFilteredProducts } from '../../api/apiProduct';
import CheckBox from './CheckBox';
import RadioBox from './RadioBox';
import { prices } from '../../utils/price';
import { isAuthnticated, userInfo } from '../../utils/auth';
import { addToCart } from '../../api/apiOrder';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(30);
    const [order, setOrder] = useState('desc');
    const [sortBy, setSortBy] = useState('createdAt');
    const [skip, setskip] = useState(0);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        category: [],
        price: []   //according to backend API
    });


    useEffect(() => {
        getProducts(sortBy, order, limit)
            .then(response => setProducts(response.data))
            .catch(err => setError("Failed to load products!"));

        getCategories()
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                setError("Failed to load categories!")
            });
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

    const handleFilters = (myfilters, filterBy) => {
        const newFilters = { ...filters }
        if (filterBy === 'category') {
            newFilters[filterBy] = myfilters; //save selected category 
        }
        if (filterBy === 'price') {
            prices.map(price => {
                if (price.id === parseInt(myfilters)) {
                    newFilters[filterBy] = price.arr;  //save selected price range
                }
            })
        }
        setFilters(newFilters);
        getFilteredProducts(skip, limit, newFilters, order, sortBy)
            .then(response => setProducts(response.data))
            .catch(error => setError("Failed to load products!"))
    }

    const showFilters = () => {
        return (<>
            <div className='row'>
                <div className='col-sm-3'>
                    <h5>Filter by categories</h5>
                    <CheckBox
                        categories={categories}
                        handleFilters={myfilters => handleFilters(myfilters, 'category')}
                    />
                    {/* stringify so that we can show category to page */}

                </div>
                <div className='col-sm-5'>
                    <h5>Filter by price</h5>
                    <div className='row'>
                        <RadioBox
                            prices={prices}
                            handleFilters={myfilters => handleFilters(myfilters, 'price')} />
                    </div>

                </div>
            </div>
        </>)
    }

    return (
        <Layout title="Home Page" className="container-fluid">
            {showFilters()}
            <div style={{ width: "100%" }}>
                {showError(error, error)}
                {showSuccess(success, "Added to cart successfully!")}
            </div>
            <div className="row">
                {products && products.map(product => <Card product={product} key={product._id} handleAddToCart={handleAddToCart(product)} />)}
            </div>
        </Layout>
    )
}

export default Home;