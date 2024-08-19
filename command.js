// Array to hold all registered commands
var commands = [];

// Function to register a command
function cmd(info, func) {
    var data = info;
    data.function = func;

    // Set default values for missing properties
    if (!data.dontAddCommandList) data.dontAddCommandList = false;
    if (!info.desc) info.desc = '';
    if (!data.fromMe) data.fromMe = false;
    if (!info.category) data.category = 'misc';
    if (!info.filename) info.filename = "Not Provided";

    // Add the command to the commands array
    commands.push(data);
    return data;
}

// Export the cmd function and other aliases
module.exports = {
    cmd,
    AddCommand: cmd,
    Function: cmd,
    Module: cmd,
    commands,
};
