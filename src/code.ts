import { Observable } from "rxjs";

//creates a new cold observable
let observable = Observable.create((observer: any) => {
    try {
        observer.next("Hey Guys!");
        observer.next("How are you?");
        setInterval(() => {
            observer.next("I am good");
        }, 2000);
        // throw new Error("piss off");
        // observer.complete();
        // observer.next("This will not send");
    } catch (err) {
        observer.error(err);
    }
});

let subscription1 = observable.subscribe(
    (x: any) => addItem(x),
    (error: any) => addItem(error),
    () => addItem("Completed")
);

let subscription2 = observable.subscribe(
    (x: any) => addItem(x + " 2"),
    (error: any) => addItem(error),
    () => addItem("Completed 2")
);

//this makes 2 a child subscription and it will end with the first one
subscription1.add(subscription2);

setTimeout(() => {
    subscription1.unsubscribe();
}, 7000);

function addItem(val: any) {
    let node = document.createElement("li");
    let textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}
