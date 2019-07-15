function lineOfSight(x1,y1,x2,y2)
{
  var dy=y2-y1;
  var dx=x2-x1;
  var f=0;
  var signY=1;
  var signX=1;
  var offsetX=0;
  var offsetY=0;
  var s=[]
  if (dy<0)
  {
    dy*=-1;
    signY=-1;
    offsetY=-1;
  }
  if (dx <0)
  {
    dx*=-1;
    signX=-1;
    offsetX=-1;
  } 
  if(dx>=dy)
  {
    while(x1!=x2)
    {
      f+=dy;
      if(f>=dx)
      {
        if(c[x1+offsetX][y1+offsetY])
        {
           return false;
    	   }
        append(s,[x1+offsetX,y1+offsetY]);
        y1+=signY;
        f-=dx;
      }
      if(f!=0)
      {
        if(c[x1+offsetX][y1+offsetY])
        {
           return false;
    	   }
      append(s,[x1+offsetX,y1+offsetY]);
      }
      if(dy==0)
      {
        if(c[x1+offsetX][y1])
        {
           return false;
    	   }
        if(c[x1+offsetX][y1-1])
        {
           return false;
    	   }
      append(s,[x1+offsetX,y1]);
      append(s,[x1+offsetX,y1-1]);
      }
      x1+=signX;
    }
  }
  else
    {
    while(y1!=y2)
    {
      f+=dx;
      if(f>=dy)
      {
        if(c[x1+offsetX][y1+offsetY])
        {
           return false;
    	   }
        append(s,[x1+offsetX,y1+offsetY]);
        x1+=signX;
        f-=dy;
      }
      if(f!=0)
      {
        if(c[x1+offsetX][y1+offsetY])
        {
           return false;
    	   }
      append(s,[x1+offsetX,y1+offsetY]);
      }
      if(dx==0)
      {
        if(c[x1][y1+offsetY])
        {
           return false;
    	   }
        if(c[x1-1][y1+offsetY])
        {
           return false;
    	   }
      append(s,[x1,y1+offsetY]);
      append(s,[x1,y1+offsetY]);
      }
      y1+=signY;
    }
  }
  s=[]
  for(var i=0;i<s.length;i++)
  {
    fill(0,255,0);
    rect(s[i][0]*len,s[i][1]*len,len,len);
  }
  return true;
}