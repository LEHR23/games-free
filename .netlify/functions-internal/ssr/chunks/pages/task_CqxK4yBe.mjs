import { Client, Databases, ID } from 'appwrite';

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6578be224e63c513fb30");

const databases = new Databases(client);

const prerender = false;
async function GET() {
  const promise = databases.listDocuments("658cc00a38f925176947", '658cc01e03cf6fd4f18f');
  let response = await promise.then(function (response) {
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }, function (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  });
  return response
}

async function POST({ params, request } ) {
  const {title} = await request.json();
  const promise = databases.createDocument("658cc00a38f925176947", '658cc01e03cf6fd4f18f', ID.unique(), {title: title});
  let response = await promise.then(function (res) {
    return new Response(JSON.stringify(res), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }).catch(function (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  });
  return response
}

async function DELETE({ params, request } ) {
  const {idTask} = await request.json();
  const promise = databases.deleteDocument("658cc00a38f925176947", '658cc01e03cf6fd4f18f', idTask);
  let response = await promise.then(function (res) {
    return new Response(JSON.stringify(res), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }).catch(function (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  });
  return response
}

async function PUT({ params, request } ) {
  const {idTask, newTitle, isCompleted} = await request.json();
  console.log(idTask, newTitle);
  const promise = databases.updateDocument("658cc00a38f925176947", '658cc01e03cf6fd4f18f', idTask, {title: newTitle, isCompleted: isCompleted});
  let response = await promise.then(function (res) {
    return new Response(JSON.stringify(res), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }).catch(function (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  });
  return response
}

export { DELETE, GET, POST, PUT, prerender };
