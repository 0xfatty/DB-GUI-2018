import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const restaurants = [
      { id: 11, name: 'Mr. Nice', imageName: '101.jpg', description: 'Description for this', rate: 1,
        reviews: [
          {"id":1,"productId":11,"userName":"test","date":"2018-04-17T22:01:45.674Z","comment":"test","rating":2},
          {"id":2,"productId":11,"userName":"test2","date":"2018-04-17T22:01:54.77Z","comment":"test2","rating":3},
          {"id":3,"productId":11,"userName":"Hello","date":"2018-04-17T22:02:05.008Z","comment":"Hello","rating":5},
          {"id":4,"productId":11,"userName":"test","date":"2018-04-18T00:57:50.72Z","comment":"test again","rating":5}
        ],
        menus: [
          {id: 1, name: "Món ăn 1", rate: 3},
          {id: 2, name: "Món ăn 2", rate: 4},
          {id: 3, name: "Món ăn 3", rate: 5},
          {id: 4, name: "Món ăn 4", rate: 3},
        ],
      },
      { id: 12, name: 'Narco', imageName: '102.jpg', description: 'Description for this', rate: 2 },
      { id: 13, name: 'Bombasto', imageName: '103.jpg', description: 'Description for this', rate: 3 },
      { id: 14, name: 'Celeritas', imageName: '101.jpg', description: 'Description for this', rate: 4 },
      { id: 15, name: 'Magneta', imageName: '102.jpg', description: 'Description for this', rate: 5 },
      { id: 16, name: 'RubberMan', imageName: '103.jpg', description: 'Description for this', rate: 1 },
      { id: 17, name: 'Dynama', imageName: '101.jpg', description: 'Description for this', rate: 2 },
      { id: 18, name: 'Dr IQ', imageName: '102.jpg', description: 'Description for this', rate: 3 },
      { id: 19, name: 'Magma', imageName: '103.jpg', description: 'Description for this', rate: 4 },
      { id: 20, name: 'Tornado', imageName: '101.jpg', description: 'Description for this', rate: 5 }
    ];
    const products = [
      { id: 11, name: 'Mr. Nice', imageName: '101.jpg', description: 'Description for this', rate: 1,
        reviews: [
          {"id":1,"productId":11,"userName":"test","date":"2018-04-17T22:01:45.674Z","comment":"test","rating":2},
          {"id":2,"productId":11,"userName":"test2","date":"2018-04-17T22:01:54.77Z","comment":"test2","rating":3},
          {"id":3,"productId":11,"userName":"Hello","date":"2018-04-17T22:02:05.008Z","comment":"Hello","rating":5},
          {"id":4,"productId":11,"userName":"test","date":"2018-04-18T00:57:50.72Z","comment":"test again","rating":5}
        ]
      },
      { id: 12, name: 'Narco', imageName: '102.jpg', description: 'Description for this', rate: 2 },
      { id: 13, name: 'Bombasto', imageName: '103.jpg', description: 'Description for this', rate: 3 },
      { id: 14, name: 'Celeritas', imageName: '101.jpg', description: 'Description for this', rate: 4 },
      { id: 15, name: 'Magneta', imageName: '102.jpg', description: 'Description for this', rate: 5 },
      { id: 16, name: 'RubberMan', imageName: '103.jpg', description: 'Description for this', rate: 1 },
      { id: 17, name: 'Dynama', imageName: '101.jpg', description: 'Description for this', rate: 2 },
      { id: 18, name: 'Dr IQ', imageName: '102.jpg', description: 'Description for this', rate: 3 },
      { id: 19, name: 'Magma', imageName: '103.jpg', description: 'Description for this', rate: 4 },
      { id: 20, name: 'Tornado', imageName: '101.jpg', description: 'Description for this', rate: 5 },
      {"id":101, "name":"Jif Creamy Peanut Butter, 40 ounces","description":"7g of Protien per serving with no preservatives, artificial flavors, or colors!","imageName":"101.jpg","price":5.99,
        "reviews":[
          {"id":1,"productId":101,"userName":"test","date":"2018-04-17T22:01:45.674Z","comment":"test","rating":2},
          {"id":2,"productId":101,"userName":"test2","date":"2018-04-17T22:01:54.77Z","comment":"test2","rating":3},
          {"id":3,"productId":101,"userName":"Hello","date":"2018-04-17T22:02:05.008Z","comment":"Hello","rating":5},
          {"id":4,"productId":101,"userName":"test","date":"2018-04-18T00:57:50.72Z","comment":"test again","rating":5}
        ]
      }
    ];
    return {restaurants, products};
  }
}
