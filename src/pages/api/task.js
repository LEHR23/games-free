import { ID } from 'appwrite';
import { databases } from '../../config/appwrite';

export async function GET() {
  const promise = databases.listDocuments(import.meta.env.APPWRITE_DATABASE, '658cc01e03cf6fd4f18f');
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

export async function POST({ params, request } ) {
  const {title} = await request.json()
  const promise = databases.createDocument(import.meta.env.APPWRITE_DATABASE, '658cc01e03cf6fd4f18f', ID.unique(), {title: title})
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
  })
  return response
}

export async function DELETE({ params, request } ) {
  const {idTask} = await request.json()
  const promise = databases.deleteDocument(import.meta.env.APPWRITE_DATABASE, '658cc01e03cf6fd4f18f', idTask)
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
  })
  return response
}

export async function PUT({ params, request } ) {
  const {idTask, newTitle, isCompleted} = await request.json()
  console.log(idTask, newTitle)
  const promise = databases.updateDocument(import.meta.env.APPWRITE_DATABASE, '658cc01e03cf6fd4f18f', idTask, {title: newTitle, isCompleted: isCompleted})
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
  })
  return response
}