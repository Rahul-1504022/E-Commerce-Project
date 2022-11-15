import axios from "axios";
import { Card, CardText, CardTitle, Col, Row } from "reactstrap";
import { getProductDetails } from "../../api/apiProduct";


const LoadOrder = ({ order }) => {

    const userOrder = order.cartItems.map(item => {
        // let productName = null;
        // getProductDetails(item.product)
        //     .then(response => productName = response.data.name)
        //     .catch(error => console.log(error))

        return (
            <div key={item._id}>
                <Row>
                    <Col md={8}>
                        <Card>
                            <CardTitle>Product Name : </CardTitle>
                            <CardText>
                                Price : <span className="bg-primary text-white">{item.price}</span> BDT &nbsp;&nbsp;&nbsp;&nbsp; Unit Ordered : <span className="bg-secondary text-white">{item.count}</span>
                                <br />
                                Total Price : {item.price * item.count} BDT
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    })

    return (
        <div style={{ marginTop: "10px" }}>
            {userOrder}
        </div>
    )
}

export default LoadOrder;