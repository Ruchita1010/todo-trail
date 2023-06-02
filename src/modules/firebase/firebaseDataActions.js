import {
  addDoc,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  updateDoc,
} from 'firebase/firestore';
import { colRef, db } from './firebase';
import { getProjectId } from '../dataModifiers';

const retrieveStoredData = async () => {
  try {
    const snapshot = await getDocs(colRef);
    let projects = [];
    snapshot.docs.forEach((doc) => {
      projects.push({ ...doc.data(), id: doc.id });
    });
    return projects;
  } catch (err) {
    console.log(err);
  }
};

const saveTodoToFirebase = async (todo) => {
  const projectId = await getProjectId(todo.projectTitle);
  const docRef = doc(db, 'projects', projectId);
  await updateDoc(docRef, {
    todos: arrayUnion(todo),
  });
};

const saveProjectToFirebase = (projectData) => {
  const project = { ...projectData, todos: [] };
  addDoc(colRef, project);
};

const deleteTodoFromFirebase = async (todoId, projectTitle) => {
  const projectId = await getProjectId(projectTitle);
  const docRef = doc(db, 'projects', projectId);
  const snapshot = await getDoc(docRef);
  const todos = snapshot.data().todos;

  const filteredTodos = todos.filter((todo) => todo.todoId !== todoId);
  await updateDoc(docRef, {
    todos: filteredTodos,
  });
};

const deleteProjectFromFirebase = async (projectTitle) => {
  const projectId = await getProjectId(projectTitle);
  const docRef = doc(db, 'projects', projectId);
  await deleteDoc(docRef);
};

const updateCountInFirebase = async (projectTitle, operation) => {
  const projectId = await getProjectId(projectTitle);
  const projectRef = doc(db, 'projects', projectId);
  // performing the operation on the highPriorityTasksCount field
  const incrementValue = operation === 'increment' ? 1 : -1;
  // updating the highPriorityTasksCount field
  return updateDoc(projectRef, {
    highPriorityTasksCount: increment(incrementValue),
  });
};

const updateCheckedAttrInFirebase = async (
  todoId,
  projectTitle,
  checkedAttr
) => {
  try {
    const projectId = await getProjectId(projectTitle);
    const projectRef = doc(db, 'projects', projectId);
    const snapshot = await getDoc(projectRef);
    const projectData = snapshot.data();
    const updatedTodos = projectData.todos.map((todo) => {
      if (todo.todoId === todoId) {
        return { ...todo, checkedAttr: checkedAttr };
      }
      return todo;
    });

    await updateDoc(projectRef, {
      todos: updatedTodos,
    });
  } catch (error) {
    console.error(error);
  }
};

export {
  saveTodoToFirebase,
  saveProjectToFirebase,
  deleteTodoFromFirebase,
  deleteProjectFromFirebase,
  retrieveStoredData,
  updateCountInFirebase,
  updateCheckedAttrInFirebase,
};
