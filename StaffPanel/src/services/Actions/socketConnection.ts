class socketConnection {
    handel(staffPanel: any, data: any) {
        staffPanel.Logger(`Socket.io connection received from ${data.handshake.address}`)
    };
};

export default socketConnection;