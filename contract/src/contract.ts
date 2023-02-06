// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, UnorderedMap, UnorderedSet } from 'near-sdk-js';

@NearBindgen({})
class HelloNear {

  // Candidate pair used to store candidates names and URL for image

  candidatePair = new UnorderedMap<string[]>("candidatePair")

  // prompt set

  promptSet = new UnorderedSet<string>("promptSet")

  //voteArray Value store in map
  voteArray = new UnorderedMap<number[]>("voteArray")

  //user participation
  userParticipation = new UnorderedMap<string[]>("userParticipation")

  //call methods
  @call({})
  addCandidatePair({
    prompt, 
    name1, 
    name2, 
    url1,
    url2, 
  }:{prompt: string;
  name1: string;
  name2: string;
  url1: string;
  url2: string;
}){
  this.candidatePair.set(prompt, [name1, url1, name2, url2]);

}

@call({})
initializeVotes({prompt}: {prompt: string}) {
  this.voteArray.set(prompt, [0, 0]);
}

@call({})
addToPromptArray({prompt}: {prompt: string}){
  this.promptSet.set(prompt);
}

@call({})
clearPromptArray(){
  this.promptSet.clear();
  this.candidatePair.clear();
  this.userParticipation.clear();
  this.voteArray.clear();
  near.log("Clearing poll")
}

@call({})
addVote({prompt, index}: {prompt: string; index: number}){
  let currentVotes = this.voteArray.get(prompt,{defaultValue: [0,0]});

  currentVotes[index] = currentVotes[index]+1;
  this.voteArray.set(prompt, currentVotes);
}

@call({})
recordUser({prompt, user}: {prompt: string; user: string;}){
  let currentArray = this.userParticipation.get(prompt, {defaultValue: []});

  currentArray.includes(user) ? null : currentArray.push(user);
  this.userParticipation.set(prompt, currentArray)
}
  

//view methods

@view({})
getUrl({prompt, name}: {prompt: string; name: string}){
  near.log(prompt);
  let candidateArray = this.candidatePair.get(prompt);

  return candidateArray[candidateArray.indexOf(name)]
}

@view({})
didParticipate({prompt, user}: {prompt: string; user: string}):boolean {
  let promptUserList: string[] = this.userParticipation.get(prompt, {defaultValue: [],})
  return promptUserList.includes(user)
}

@view({})
getAllPrompt(): string[] {
  return this.promptSet.toArray();
}

@view({})
getCandidatePair({prompt}: {prompt: string;}): string[] {
  let candidateArray = this.candidatePair.get(prompt, {
    defaultValue: ["n/a", "n/a", "n/a", "n/a"],
  })

  return [candidateArray[0], candidateArray[2]]
}

  // @view({}) // This method is read-only and can be called for free
  // get_greeting(): string {
  //   return this.message;
  // }

  // @call({}) // This method changes the state, for which it cost gas
  // set_greeting({ message }: { message: string }): void {
  //   near.log(`Saving greeting ${message}`);
  //   this.message = message;
  // }
}