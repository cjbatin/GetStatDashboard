import * as shell from "shelljs";

// Copy all the view templates
shell.cp( "-R", "src/views", "src/.build" );
shell.cp( "-R", "src/assets", "src/.build" );
