//import React, { useState } from "react";

//const ArchitectureTool = () => {
//  const [classes, setClasses] = useState([]);
//  const [newClassName, setNewClassName] = useState("");
//  const [newClassComment, setNewClassComment] = useState("");
//  const [selectedPattern, setSelectedPattern] = useState("");
//  const [parentClasses, setParentClasses] = useState([]);
//
//  const handleCreateClass = () => {
//    if (newClassName) {
//      const newClass = {
//        id: Date.now().toString(),
//        name: newClassName,
//        comment: newClassComment,
//        pattern: selectedPattern || "Custom",
//        parents: parentClasses,
//        methods: [],
//      };
//      setClasses([...classes, newClass]);
//      setNewClassName("");
//      setNewClassComment("");
//      setSelectedPattern("");
//      setParentClasses([]);
//    }
//  };
//
//  const handleAddParentClass = (parentClassName) => {
//    if (!parentClasses.includes(parentClassName)) {
//      setParentClasses([...parentClasses, parentClassName]);
//    }
//  };
//
//  const handleRemoveParentClass = (parentClassName) => {
//    setParentClasses(parentClasses.filter((name) => name !== parentClassName));
//  };
//
//  const handleDeleteClass = (classId) => {
//    setClasses(classes.filter((cls) => cls.id !== classId));
//  };
//
//  return (
//    <div className="container">
//      <h1>Архитектурный инструмент</h1>
//
//      {/* Создание класса */}
//      <div className="section">
//        <h2>Создать класс</h2>
//        <input
//          type="text"
//          placeholder="Имя класса"
//          value={newClassName}
//          onChange={(e) => setNewClassName(e.target.value)}
//        />
//        <textarea
//          placeholder="Комментарий к классу"
//          value={newClassComment}
//          onChange={(e) => setNewClassComment(e.target.value)}
//        />
//        <select
//          value={selectedPattern}
//          onChange={(e) => setSelectedPattern(e.target.value)}
//        >
//          <option value="">Выберите паттерн</option>
//          <option value="Singleton">Singleton</option>
//          <option value="Factory">Factory</option>
//          <option value="Observer">Observer</option>
//          <option value="Custom">Custom</option>
//        </select>
//
//        {/* Добавление родительских классов */}
//        <h4>Наследование</h4>
//        <select
//          onChange={(e) => handleAddParentClass(e.target.value)}
//          defaultValue=""
//        >
//          <option value="">Выберите родительский класс</option>
//          {classes.map((cls) => (
//            <option key={cls.id} value={cls.name}>
//              {cls.name}
//            </option>
//          ))}
//        </select>
//        <div className="parents">
//          {parentClasses.map((parent) => (
//            <span key={parent} className="parent">
//              {parent}
//              <button onClick={() => handleRemoveParentClass(parent)}>×</button>
//            </span>
//          ))}
//        </div>
//
//        <button onClick={handleCreateClass}>Создать класс</button>
//      </div>
//
//      {/* Список классов */}
//      <div className="section">
//        <h2>Классы</h2>
//        {classes.map((cls) => (
//          <div key={cls.id} className="class-card">
//            <h3>
//              {cls.name} ({cls.pattern})
//              <button onClick={() => handleDeleteClass(cls.id)}>Удалить</button>
//            </h3>
//            <p>{cls.comment}</p>
//            {cls.parents.length > 0 && (
//              <p>
//                Наследует от: {cls.parents.join(", ")}
//              </p>
//            )}
//          </div>
//        ))}
//      </div>
//    </div>
//  );
//};
//
//export default ArchitectureTool;

import React, { useState } from 'react';

const ArchitectureTool = () => {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState('');
  const [newClassComment, setNewClassComment] = useState('');
  const [selectedPattern, setSelectedPattern] = useState('');
  const [customMethodName, setCustomMethodName] = useState('');
  const [customMethodComment, setCustomMethodComment] = useState('');
  const [selectedClassForCall, setSelectedClassForCall] = useState('');
  const [selectedMethodForCall, setSelectedMethodForCall] = useState('');
  const [currentMethodCalls, setCurrentMethodCalls] = useState([]);

  const handleCreateClass = () => {
    if (newClassName) {
      const newClass = {
        id: Date.now().toString(),
        name: newClassName,
        pattern: selectedPattern || 'Custom',
        comment: newClassComment,
        methods: [],
      };
      setClasses([...classes, newClass]);
      setNewClassName('');
      setNewClassComment('');
      setSelectedPattern('');
    }
  };

  const handleAddCustomMethod = (classId) => {
    if (customMethodName) {
      const updatedClasses = classes.map((cls) =>
        cls.id === classId
          ? {
              ...cls,
              methods: [
                ...cls.methods,
                {
                  id: Date.now().toString(),
                  name: customMethodName,
                  comment: customMethodComment,
                  calls: [],
                },
              ],
            }
          : cls
      );
      setClasses(updatedClasses);
      setCustomMethodName('');
      setCustomMethodComment('');
    }
  };

  const handleAddCallToMethod = (classId, methodId) => {
    const newCall = selectedClassForCall && selectedMethodForCall
      ? { class: selectedClassForCall, method: selectedMethodForCall }
      : { class: null, method: null }; // Вызов пустоты

    const updatedClasses = classes.map((cls) =>
      cls.id === classId
        ? {
            ...cls,
            methods: cls.methods.map((method) =>
              method.id === methodId
                ? { ...method, calls: [...method.calls, newCall] }
                : method
            ),
          }
        : cls
    );
    setClasses(updatedClasses);
    setSelectedClassForCall('');
    setSelectedMethodForCall('');
  };

  const handleDeleteMethod = (classId, methodId) => {
    const updatedClasses = classes.map((cls) =>
      cls.id === classId
        ? {
            ...cls,
            methods: cls.methods.filter((method) => method.id !== methodId),
          }
        : cls
    );
    setClasses(updatedClasses);
  };

  const handleDeleteCall = (classId, methodId, callIndex) => {
    const updatedClasses = classes.map((cls) =>
      cls.id === classId
        ? {
            ...cls,
            methods: cls.methods.map((method) =>
              method.id === methodId
                ? {
                    ...method,
                    calls: method.calls.filter((_, index) => index !== callIndex),
                  }
                : method
            ),
          }
        : cls
    );
    setClasses(updatedClasses);
  };

  const handleGenerateJSON = async () => {
    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classes }),
      });
      const result = await response.json();
      console.log('Ответ от сервера:', result);
      alert('JSON сгенерирован и отправлен на сервер!');
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
      alert('Произошла ошибка при генерации JSON.');
    }
  };

  return (
    <div>
      <h1>Инструмент для создания архитектуры</h1>

      {/* Создание класса */}
      <div>
        <h2>Создать класс</h2>
        <input
          type="text"
          placeholder="Имя класса"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
        />
        <textarea
          placeholder="Комментарий к классу"
          value={newClassComment}
          onChange={(e) => setNewClassComment(e.target.value)}
        />
        <select
          value={selectedPattern}
          onChange={(e) => setSelectedPattern(e.target.value)}
        >
          <option value="">Выберите паттерн</option>
          <option value="Singleton">Singleton</option>
          <option value="Factory">Factory</option>
          <option value="Observer">Observer</option>
        </select>
        <button onClick={handleCreateClass}>Создать класс</button>
      </div>

      {/* Управление классами и методами */}
      {classes.map((cls) => (
        <div key={cls.id}>
          <h3>
            Класс: {cls.name} ({cls.pattern})
          </h3>
          <p>{cls.comment}</p>

          <input
            type="text"
            placeholder="Имя метода"
            value={customMethodName}
            onChange={(e) => setCustomMethodName(e.target.value)}
          />
          <textarea
            placeholder="Комментарий к методу"
            value={customMethodComment}
            onChange={(e) => setCustomMethodComment(e.target.value)}
          />
          <button onClick={() => handleAddCustomMethod(cls.id)}>
            Добавить метод
          </button>

          {cls.methods.map((method) => (
            <div key={method.id}>
              <h4>
                Метод: {method.name}{' '}
                <button onClick={() => handleDeleteMethod(cls.id, method.id)}>
                  Удалить метод
                </button>
              </h4>
              <p>{method.comment}</p>

              <h5>Вызовы:</h5>
              <ul>
                {method.calls.map((call, index) => (
                  <li key={index}>
                    {call.class ? `${call.class}.${call.method}` : 'null'}
                    <button
                      onClick={() =>
                        handleDeleteCall(cls.id, method.id, index)
                      }
                    >
                      Удалить вызов
                    </button>
                  </li>
                ))}
              </ul>

              <h5>Добавить вызов:</h5>
              <select
                value={selectedClassForCall}
                onChange={(e) => setSelectedClassForCall(e.target.value)}
              >
                <option value="">Выберите класс</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedMethodForCall}
                onChange={(e) => setSelectedMethodForCall(e.target.value)}
              >
                <option value="">Выберите метод</option>
                {classes
                  .find((c) => c.name === selectedClassForCall)
                  ?.methods.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name}
                    </option>
                  ))}
              </select>
              <button
                onClick={() => handleAddCallToMethod(cls.id, method.id)}
              >
                Добавить вызов
              </button>
            </div>
          ))}
        </div>
      ))}

      <button onClick={handleGenerateJSON}>Сгенерировать JSON</button>
    </div>
  );
};

export default ArchitectureTool;
