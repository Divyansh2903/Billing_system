const dashboardServices=require("../services/dashboardServices")
exports.getDashboardData = async (req, res) => {

    const allOrders = await dashboardServices.getDashboardData();
    res.json(allOrders)

};

