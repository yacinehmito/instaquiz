The different states that the client can go through during a session and their interactions can get pretty complicated.
This document will clarify my mind. Everything is from the client perspective.

## Joining a session

The server starts a session from which the client can join. It does so using a websocket.

Once the websocket is connected, we can fall in one of those 3 states:
- the session hasn't started yet
- the session is about to start
- the session has already started

In the first case, the client is invited to come another time.
In the second case (the desirable one), clients wait for the server's signal
In the third case, we need to allow the client to be able to gracefuly join or rejoin a session.
There are indeed two cases server-side:
- The client is identified as having joined the session earlier
- The client joined for the first time
We need to handle those cases differently

## The start

The server should send as much data as possible for the client to carry on.
Such a message should contain at least all the questions and their respective choices.
There is no need to send a datetime or time interval for the beginning of the session.

When the session actually starts, clients should receive a message that prompts them to go to the next state.

## The loop

The client loops through the question; the pacing is decided by the server.
For a given question, there are many possible states:
- The user can select answers and modify the selection at will
- Same, but a countdown appears
- The choices are locked; the user cannot modify the selection but the right answer is not provided yet
- The client displays the user's result with the right answer
- The client waits for the next question

## The end

The final results are displayed and the connection is ended

## Protocol

At any point, a client can send a ask-status message, which the server answers with the status of the current session, i.e.:
- The current state
- The list of all the questions with their respective choices
- When applicable, the results of the user with the right answer

C>S ready: The client wishes to join the session
S>C join: Similar to status; only the semantic changes
C>S ack-join: The client is prepared
S>C prestart: When everyone is connected we poll the client to make sure they are still there
C>S ack-prestart: Answering the prestart
    There can be as many prepare and prestart
S>C question: The session has officialy started. Each question msg should contain the id of the question that is currently asked
C>S select: Sends the current choices selected. An empty select serves as an ack for question.
    There can be as many select as necessary
S>C countdown: The selection is almost over; sends the following:
    - time at which the msg was sent
    - time at which the answers will be locked
    - number of seconds left
    The client has all the info to guess how many seconds should be displayed for the user
S>C lock: Actual lock
C>S answers: The user's answer
S>C results: How well did the user do and what was the right answer
S>C question: And the cycle continues until...
S>C results: Results of the last question

Server-side, 4 states for the client:
- Absent; it never joined the session
- Disconnected; it joined but didn't finish
- Connected; it joined ans is currently participating in the session
- Left; it joined but left because the session is done



