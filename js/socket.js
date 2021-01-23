function new_websocket(url, ready_callback, message_callback) {
    let socket = new WebSocket(url);
    socket.onopen = function() {
        console.log('WebSocket is now open');
        if (ready_callback !== undefined) ready_callback(this);
    }
    socket.onerror = function(e) {
        console.error('WebSocket error');
        console.error(e);
    }
    socket.onmessage = function(response) {
        console.log('New message from: '+ url);
        // console.log(response);
        if (message_callback !== undefined) message_callback(response);
    }

    return socket;
}

new_websocket('wss://node.somenano.com/repeater', function(socket) {
    // onopen
    let params = {
        action: 'subscribe',
        topic: 'confirmation'
    }
    socket.send(JSON.stringify(params));
}, function(response) {
    // onmessage
    let data = JSON.parse(response.data);
    if (data.topic != 'confirmation') return;
    handle_block_dump(data);
});

function handle_block_dump(data)
{
    let dtg, cps, blocks, duration = undefined;
    try {
        dtg = new Date(data.dtg);
        cps = data.cps;
        blocks = data.blocks;
        duration = data.duration;
    } catch(e) {
        console.error('In socket.handle_block_dump: error parsing received WebSocket data.');
        console.error(data);
        console.error(e);
        return;
    }

    console.log(''+ String(dtg.getHours()).padStart(2, '0') +':'+ String(dtg.getMinutes()).padStart(2, '0') +':'+ String(dtg.getSeconds()).padStart(2, '0') + ' - Received '+ blocks.length +' Nano Blocks from the last '+ (duration/1000).toFixed(2) +' second(s). CPS is '+ cps.toFixed(2) +' over the last 30 seconds.');

    // Iterate over each block and "handle" spread over the given duration
    let spread = duration / blocks.length;
    for (let i=0 ; i<blocks.length ; i++) {
        let block = blocks[i];
        setTimeout(function() { handle_new_block(block); }, spread*i);
    }
}

function handle_new_block(data) {
    // console.log(data);
    // const nano_block = JSON.parse(data.block);
    const account = data.account;
    const hash = data.hash;
    const block = data.block;
    const amount = data.amount;
    const subtype = block.subtype;

    // console.log('New '+ subtype +' block from '+ account +' (https://nanocrawler.cc/explorer/block/'+ hash +')');
    
    newParticle(account);
};