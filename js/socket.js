var socket = io.connect('https://repeater.somenano.com');
socket.emit('subscribe_all');

socket.on('new_block', function(data) {
    const nano_block = JSON.parse(data.block);
    const account = data.account;
    const hash = data.hash;
    const block = data.block;
    const amount = data.amount;
    const subtype = data.subtype;

    console.log('New '+ subtype +' block from '+ account +' (https://nanocrawler.cc/explorer/block/'+ hash +')');
    
    newParticle(account);
});