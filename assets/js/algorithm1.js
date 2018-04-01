let movements = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1]
];

function AStar(data){
  let startNode = new Node(null,data.Start.x,data.Start.y);
  let goalNode = new Node(null,data.Goal.x,data.Goal.y);
  let opened_list = [];
  let closed_list = [];
  let opened = new PQ();

  opened_list.push(startNode);
  opened.push(startNode);

  while(opened_list.length > 0){
    let node = opened.pop();
    closed_list.push(node)
    
    if(node.Equals(goalNode)){
      let path = [];
      let current = node;
      while(current){
        var col = current.getX();
        var row = current.getY();
        current = current.getParent();
        path.push({x:col,y:row});
      }

      for(let i = path.length - 2 ; i >= 1 ; i--){
        drawPath(path[i].x,path[i].y);
      }

      break;
    }

    let children = [];
    for(let i = 0 ; i < movements.length ; i++){
      let x = node.getX() + movements[i][0];
      let y = node.getY() + movements[i][1];
      if(x < 0 || y < 0 || x > data.col - 1 || y > data.row - 1) continue;
      let walls = data.walls;
      let isWall = false;
      for(let j = 0 ; j < walls.length ; j++){
        if(walls[j].x === x && walls[j].y === y){ isWall = !isWall; break;}
      }
      if(!isWall){
        children.push(new Node(node,x,y));
      }
    }

    for(let i = 0 ; i < children.length ; i++){
      let find = false;
      let child = children[i];
      for(let j = 0 ; j < closed_list.length ; j++){
        if(child.Equals(closed_list[j])){
          find = true;
        }
      }
      if(find) continue;
      child.setG(node.getG() + 1);
      child.setH(Math.pow(child.getX() - node.getX(),2) + Math.pow(child.getY() - node.getY(),2));
      child.setF(child.getG() + child.getH());

      find = false;

      for(let j = 0 ; j < opened_list.length ; j++){
        if(child.Equals(opened_list[j]) && child.getF() > opened_list[j].getF()){
          find = true;
        }
      }
      if(!find){
        opened_list.push(child);
        opened.push(child);
      }
    }
   }



}