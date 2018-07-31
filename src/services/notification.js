
function notification(obj,message='default message',type='warning',action='Ok'){
   obj.$snackbar.open({
        duration: 3000,
        message:message,
        type: 'is-'+type,
        position: 'is-bottom-right',
        actionText: action,
        queue: false,
    });
};

export default notification;