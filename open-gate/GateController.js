exports.openInnerGate = (req, res) => {
    console.log(req.body);
    res.status(200);
    res.send();



}

exports.openOuterGate = (req, res) => {
    console.log(req.body)
    res.status(200);
    res.send();
}
