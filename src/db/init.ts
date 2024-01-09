import {AppDataSource} from "@/db/ormconfig";
import {Prompt} from "@/db/entity/prompt";
import {PromptVariable} from "@/db/entity/prompt_variable";

AppDataSource.initialize().then(() => {
    console.log("AppDataSource initialized");
    const promptRepo = AppDataSource.getRepository(Prompt);
    const promptVariableRepo = AppDataSource.getRepository(PromptVariable);
    const prompt: Prompt = new Prompt();
    prompt.name = "類義語を探す";
    prompt.prompt = "「{{word}}」の類義語を{{number}}個探してみよう";
    prompt.isActive = true;

    const word: PromptVariable = new PromptVariable();
    word.name = "word";
    word.type = "string";
    word.prompt = prompt;

    const number: PromptVariable = new PromptVariable();
    number.name = "number";
    number.type = "number";
    number.prompt = prompt;

    promptRepo.save(prompt);
    promptVariableRepo.save(word);
    promptVariableRepo.save(number);

}).catch((error) => {
    console.log("AppDataSource failed to initialize");
    console.log(error);
});