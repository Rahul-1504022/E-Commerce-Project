import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap"

const UserCoupon = ({ coupon }) => {
    return (
        <div className="row">
            <div className="col-md-4">
                <Card>
                    <CardHeader>{coupon.couponName}</CardHeader>
                    <CardBody>Amount : {coupon.discountAmount}<br />Min. Purchase : {coupon.minPurchase}</CardBody>
                    <CardFooter><Button block color="danger">Use Now</Button></CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default UserCoupon;