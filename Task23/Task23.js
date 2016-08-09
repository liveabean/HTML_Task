function visitTreeNode(node) {
    node.css('background-color', 'pink');
    setTimeout(function() {
        node.css('background-color', 'white');
    }, speed);
}

var speed = 500;

function getDeepTraverse(root) {
    console.log(root.children('has("span")').text());
}

$('#btnStart').click(function(event) {
    var tree = $('#tree');
    getDeepTraverse(tree);
});