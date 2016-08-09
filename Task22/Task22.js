function visitTreeNode(node) {
    node.css('background-color', 'pink');
    setTimeout(function() {
        node.css('background-color', 'white');
    }, speed);
}

var speed = 1000;
function getFnTraverse(value) {
    var stack = [];
    var func;
    if (value === '0') {
        func = function fn(root) {        	
            if (root.length ==0) {
                return;
            }
            stack.push(function() {
                visitTreeNode(root);
            })
            fn(root.children().first());
            fn(root.children().last());
        }
    } else if (value === '1') {
        func = function fn(root) {
            if (root.length ==0) {
                return;
            }
            fn(root.children().first());
            stack.push(function() {
                visitTreeNode(root);
            })
            fn(root.children().last());
        }
    } else if (value === '2') {
        func = function fn(root) {
            if (root.length ==0) {
                return;
            }
            fn(root.children().first());
            fn(root.children().last());
            stack.push(function() {
                visitTreeNode(root);
            })
        }
    }
    return function(root) {
        $('#btnStart').attr("disabled",true);
        func(root);
        var it = setInterval(function() {
            if (stack.length === 0) {
                clearInterval(it);                
                $('#btnStart').attr("disabled",false); 
                return;
            }
            stack.shift()();
        }, speed);
    }
}
$('#btnStart').click(function(event) {
  var tree = $('#tree');
  getFnTraverse($("#selectMode").val())(tree);
});