var len=30;
var c1,c2;
var c=[];
var pathlist=[];
var visited=[];
var v=0,flag=0;
var Q;
function setup() {
  createP('enter number of rows : ');
  row=createInput(10);//number of rows
  row.position(175,15);
  createP('enter number of columns : ');
  
	col=createInput(10);//number of columns
  col.position(175,50);
  createP('enter x-coordinate of source : ');
  sx=createInput();
  sx.position(195,85);
  createP('enter y-coordinate of source : ');
  sy=createInput();
	sy.position(195,120);
  createP('enter x-coordinate of destination : ');
  dx=createInput();
  dx.position(225,155);
  createP('enter y-coordinate of destination : ');
  dy=createInput();
  dy.position(225,190);
  c1=createCanvas(col.value()*len+1,row.value()*len+1);
  c1.position(100,275);
  for(var i=-1;i<=col.value();i++)
  {
    c[i]=[];
    for(var j=-1;j<=row.value();j++)
    {
      c[i][j]=false;
      if(i==-1 || j==-1 || i==col.value() ||j==row.value()){
        c[i][j]=true;
      }  
    }
      
  }
}
function keyPressed() {
  if (keyCode === ENTER) {
  	start();
  }
  if (keyCode === ESCAPE) {
  	optimise();
  }
  if(keyCode === CONTROL)
    {
      windowResized();
    }
  if(keyCode===BACKSPACE)
  {
    c=[],l=[],flag=0,visited=[];
    s="SOLUTION";
    for(var i=-1;i<=col.value();i++)
   {
     c[i]=[]
    for(var j=-1;j<=row.value();j++)
    {
      c[i][j]=false;
      if(i==-1 || j==-1 || i==col.value() ||j==row.value()){
        c[i][j]=true;
      }  
    }
      
  }
  }
}
var l=[];
function start()
{
  flag=1,visited=[],v=0;
  s=new node(Number(sx.value()),Number(sy.value()),Number(dx.value()),Number(dy.value()));
  d=new node(Number(dx.value()),Number(dy.value()),Number(dx.value()),Number(dy.value()));
/*   s=new node(0,0,9,9);
  d=new node(9,9,9,9);*/
  a=new A_star(s,d);
  a.astar();
  x=d;
  pathlist=[];
  while(x!=null){
  	pathlist[pathlist.length]=[x.cox,x.coy];
  	x=x.parent;
  }
  if(pathlist.length==1)
  {
    s="PATH DOES NOT EXIST";
  }
  else
  {
    s="PATH EXISTS";
  }
}
function optimise()
{
  var i,j;
  s="OPTIMISED PATH"
  for(i=0;i<pathlist.length-1;i++)
  {
    /*for(j=i+2;j<pathlist.length;j++)
    {
      if(lineOfSight(pathlist[i][0],pathlist[i][1],pathlist[j][0],pathlist[j][1]))
      {
        pathlist.splice(i+1,j-i-1);
        i=pathlist.length;
        j=i;
      }
    }*/
    for(j=pathlist.length-1;j>=i+2;j--)
    {
      if(lineOfSight(pathlist[i][0],pathlist[i][1],pathlist[j][0],pathlist[j][1]))
      {
        pathlist.splice(i+1,j-i-1);
        i=pathlist.length;
        j=i;
      }
    }
  }
}
var s="SOLUTION";
function draw() {
 var o=createInput(s);
  o.position(120,230);
	if(mouseIsPressed)
  {
    var x=int(mouseX/len),y=int(mouseY/len);
    if(x<col.value() && y<row.value())
       {
       		fill(255,0,0);
   				append(l,[x,y]);
         if(!c[x]){
           c[x]=[];
       }
          c[x][y]=true;
       }
  }
  background(255);
  var i,j;
  stroke(0);
  strokeWeight(1);
  for(i=0;i<=width;i+=len)
  {
    line(i,0,i,height);
  }
  
  for(i=0;i<=height;i+=len)
  {
    line(0,i,width,i);
  }
  for(i=0;i<l.length;i++)
  {
    fill(100);
    rect(l[i][0]*len,l[i][1]*len,len,len);
  }
  if(flag==1 && v<visited.length)
  {
    frameRate(10);
 		strokeWeight(3);
    for(var p=0;p<v;p++)
    {
      if(visited[p][4]==0)
     {
  		 stroke(255,128,0);
       line(visited[p][0],visited[p][1],visited[p][2],visited[p][3]);
     }
    else
    {
      stroke(0,220,0);
  		line(visited[p][0],visited[p][1],visited[p][2],visited[p][3]);  
    }  
  	}
  	v+=1;
  }
  else
  {
    frameRate(10);
  	strokeWeight(3);
    for(var p=0;p<v-1;p++)
    {
    if(visited.length!=0 && visited[p][4]==0)
     {
  		 stroke(255,128,0);
       line(visited[p][0],visited[p][1],visited[p][2],visited[p][3]);
     }
    else if(visited.length!=0)
    {
      stroke(0,220,0);
  		line(visited[p][0],visited[p][1],visited[p][2],visited[p][3]);  
    }
  	}
    for(i=0;i<pathlist.length-1;i++)
    {
    stroke(0,0,0);
    strokeWeight(5);
    line(pathlist[i][0]*len,pathlist[i][1]*len,pathlist[i+1][0]*len,pathlist[i+1][1]*len);
    }
  }
  
}
function windowResized()
{
  resizeCanvas(col.value()*len+1,row.value()*len+1);
  l=[],c=[],flag=0,visited=[];
  s="SOLUTION";
  pathlist=[];
  for(var i=-1;i<=col.value();i++)
  {
    c[i]=[];
    for(var j=-1;j<=row.value();j++)
    {
    	c[i][j]=false;
       if(i==-1 || j==-1 || i==col.value() ||j==row.value()){
        c[i][j]=true;
      }
    }
      
  }
}
function distance(x1,y1,x2,y2)
{
  var d=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
  return d;
}