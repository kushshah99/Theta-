class node{
	constructor(cox,coy,goalx,goaly){
  	this.cox=cox;
    this.coy=coy;
    this.goalx=goalx;
    this.goaly=goaly;
    this.parent=null;
    this.approx=Math.sqrt((this.cox-this.goalx)*(this.cox-this.goalx)+(this.coy-this.goaly)*(this.coy-this.goaly));
    this.weight=Infinity;
    this.total=this.weight+this.approx;
    this.bheap=null;
  }
  
}
class A_star{
  constructor(s,d){
  	this.nodes=[];
    this.source=s;
    this.dest=d;
  }
  
/* is_safe(x,y){
    if(x<=col.value() && y<row.value() && x>=0 && y>=0 && c[x][y]!=true)
       return true;
    return false;
  }
   neighbours(x,y){
     var neigh=[[x-1,y-1],[x-1,y],[x-1,y+1],[x,y-1],[x,y+1],[x+1,y-1],[x+1,y],[x+1,y+1]];
     return neigh;
   }*/
 neighbours(x,y,c){
	var n=[];
  var k;
	if(x>=0 && y>=0 && x<=col.value()-1 && y<=row.value()-1 && c[x][y]!=true)
	{
		k=n.length;
		n[k]=[x+1,y+1];
	}
	if(x>=0 && y>=1 && x<=col.value()-1 && y<=row.value() && c[x][y-1]!=true)
	{
		k=n.length;
		n[k]=[x+1,y-1];
	}
	if(x>=1 && y>=1 && x<=col.value() && y<=row.value() && c[x-1][y-1]!=true)
	{
		k=n.length;
		n[k]=[x-1,y-1];
	}
	if(x>=1 && y>=0 && x<=col.value() && y<=row.value()-1 && c[x-1][y]!=true)
	{
		k=n.length;
		n[k]=[x-1,y+1];
	}
	//***
	if(x>=0 && y>=0 && x<=col.value()-1 && y<=row.value() && (c[x][y-1]!=true || c[x][y]!=true))
	{
		k=n.length;
		n[k]=[x+1,y];
	}
	if(x>=1 && y>=0 && x<=col.value() && y<=row.value() && (c[x-1][y-1]!=true || c[x-1][y]!=true))
	{
		k=n.length;
		n[k]=[x-1,y];
	}
	if(x>=0 && y>=1 && x<=col.value() && y<=row.value() && (c[x-1][y-1]!=true || c[x][y-1]!=true))
	{
		k=n.length;
		n[k]=[x,y-1];
	}
	if(x>=0 && y>=0 && x<=col.value() && y<=row.value()-1 && (c[x-1][y]!=true || c[x][y]!=true))
	{
		k=n.length;
		n[k]=[x,y+1];
	}
  return n;
}
   astar(){
   	Q=new BinomialHeap();
   	this.source.weight=0;
   	var n;
   	this.source.total=this.source.approx;

   	for(let i=0;i<=col.value();i++){
   		this.nodes[i]=[];
   		for(let j=0;j<=row.value();j++){
   			if(i==this.source.cox && j==this.source.coy){
   				n=this.source;
   			}
   			else if(i==this.dest.cox && j==this.dest.coy){
   				n=this.dest;	
   			}
   			else{
   				n=new node(i,j,this.dest.cox,this.dest.coy);
   			}
   			this.nodes[i][j]=n;
   			Q.insert(n);
   		}
   	}
   	var temp,neighbour,q;
   	while(Q.trees[0]){
   		q=Q.extract_min();
      if(q==this.dest)
      {
        break;
      }
   		temp=this.neighbours(q.cox,q.coy,c);
   		for (let i=0;i<temp.length;i++){
   				neighbour=this.nodes[temp[i][0]][temp[i][1]];
           
        if (neighbour.total > q.weight+distance(neighbour.cox,neighbour.coy,q.cox,q.coy)+neighbour.approx)
          {
            visited[visited.length]=[neighbour.cox*len,neighbour.coy*len,q.cox*len,q.coy*len,0];

            neighbour.parent=q;  
						neighbour.weight=q.weight+distance(neighbour.cox,neighbour.coy,q.cox,q.coy);
						neighbour.total=neighbour.approx+neighbour.weight;
          	if(q.parent!=null && lineOfSight(q.parent.cox,q.parent.coy,neighbour.cox,neighbour.coy)){
          	   		if(distance(neighbour.cox,neighbour.coy,q.parent.cox,q.parent.coy)<distance(neighbour.cox,neighbour.coy,q.cox,q.coy)+distance(q.parent.cox,q.parent.coy,q.cox,q.coy)) //(neighbour.total > q.parent.weight+distance(neighbour.cox,neighbour.coy,q.parent.cox,q.parent.coy)+neighbour.approx)
          	         {
          	         		neighbour.parent=q.parent;
                        neighbour.weight=q.parent.weight+distance(neighbour.cox,neighbour.coy,q.parent.cox,q.parent.coy);
          	            neighbour.total=neighbour.weight+neighbour.approx;
                        visited[visited.length]=[neighbour.cox*len,neighbour.coy*len,neighbour.parent.cox*len,neighbour.parent.coy*len,1];
          	         }
          	   }
						Q.update_priority(neighbour);
					}
   			
   		}
   	}
    /*var t=this.dest;
    	if(t.parent!=null && t.parent.parent!=null)
      {
        var pp=t.parent.parent;
        if(lineOfSight(t.cox,t.coy,pp.cox,pp.coy))
        {
          t.parent=pp;
        }
      }*/
   }
  }