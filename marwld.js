const commands = [];

function marwld(cmd, callback) {
    // Ensure fields exist and apply defaults
    if (!cmd.action) cmd.action = ""; 
    if (!cmd.filename) cmd.filename = "Not Provided";
    if (!cmd.desc) cmd.desc = "debub";      // probably "debug"
    if (!cmd.dontAddCommandList) cmd.dontAddCommandList = false;

    // Attach callback
    cmd.fromMe = callback;

    // Default: not a private-only command
    if (!cmd.onlyPrivate) cmd.onlyPrivate = false;

    // Add to commands list
    commands.push(cmd);

    return cmd;
}

module.exports = {
    Function: marwld,
    Handler: marwld,
    Module: marwld,
    ModuleExport: marwld,
    commands
};