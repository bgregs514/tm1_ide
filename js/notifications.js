const { Notification } = require('electron').remote;

/*****************************************
 * Message Boxes
 ****************************************/
/* INFO: Null rule */
o_NullRule = {
	title: "No Rule",
	body: "There is no rule available for this cube.  Click here to create one.",
	silent: true
	//icon: __dirname + '\resources\code.png'
};
const n_NullRule = new Notification(o_NullRule);
n_NullRule.on('click', (event) => {
	console.log("notification clicked");
});

/* INFO: Rule Save Success */
o_RuleSaveSuccess = {
	title: "Rule Saved Successfully",
	body: "Rule has been saved to the TM1 instance.",
	silent: true
	//icon: __dirname + '\resources\code.png'
};
const n_RuleSaveSuccess = new Notification(o_RuleSaveSuccess);
n_RuleSaveSuccess.on('click', (event) => {
	console.log("notification clicked");
});

/* ERROR: Generic Error Template */
// I don't like this apprach, need to rework this
function ThrowError(err_title, err_body)
{
	o_GenericError = {
		title: err_title,
		body: err_body,
		silent: true
		//icon: __dirname + '\resources\code.png'
	};
	const n_GenericError = new Notification(o_GenericError);
	n_GenericError.show();
}