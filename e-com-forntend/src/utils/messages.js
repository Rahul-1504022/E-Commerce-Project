export const showError = (error, msg) => {
    if (error) return <div className="alert alert-danger">{msg}</div>
}


export const showLoading = (loading) => {
    if (loading) return <div className="alert alert-info">Loading....</div>
}