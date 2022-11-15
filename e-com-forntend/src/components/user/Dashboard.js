import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { userInfo } from '../../utils/auth';
import { useEffect, useState } from 'react';
import { getOrderHistory } from '../../api/orderHistory';
import LoadOrder from './LoadOrder';

const Dashboard = () => {
    const { name, email, role } = userInfo();
    const [loadOrder, setLoadOrder] = useState([]);

    useEffect(() => {
        getOrderHistory(userInfo().token)
            .then(response => setLoadOrder(response.data))
            .catch(error => console.log(error));
    }, [])

    let loadOrderHistory = null;
    if (loadOrder !== []) {
        console.log(loadOrder);
        loadOrderHistory = loadOrder.map(order => (
            <LoadOrder
                key={order._id}
                order={order}
            />
        ))
    }


    const UserLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="#">Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    };

    // const PurchaseHistory = () => (
    //     <div className="card mb-5">
    //         <h3 className="card-header">Purchase History</h3>
    //         <ul className="list-group">
    //             <li className="list-group-item">{}</li>
    //         </ul>
    //     </div>
    // );

    const UserInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role}</li>
            </ul>
        </div>
    );

    return (
        <Layout title="Dashboard" className="container-fluid">
            <div className="row">
                <div className="col-sm-3">
                    <UserLinks />
                </div>
                <div className="col-sm-9">
                    <UserInfo />
                    {loadOrderHistory}
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;