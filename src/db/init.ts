import {AppDataSource} from "@/db/ormconfig";
import * as process from "process";
import {Prompt} from "@/db/entity/prompt";
import {PromptVariable} from "@/db/entity/prompt_variable";

console.log(process.env);

AppDataSource.initialize().then(() => {
    console.log("AppDataSource initialized");
    const promptRepo = AppDataSource.getRepository(Prompt);
    const promptVariableRepo = AppDataSource.getRepository(PromptVariable);
    const prompt: Prompt = new Prompt();
    prompt.name = "類義語を探す";
    prompt.prompt = "「{{word}}」の類義語を探してみよう";
    prompt.isActive = true;

    const promptVariable: PromptVariable = new PromptVariable();
    promptVariable.name = "word";
    promptVariable.type = "string";
    promptVariable.prompt = prompt;
    promptVariable.isActive = true;

    promptRepo.save(prompt);
    promptVariableRepo.save(promptVariable);

}).catch((error) => {
    console.log("AppDataSource failed to initialize");
    console.log(error);
});