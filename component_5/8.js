// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Transitive Closure Package
// 2019, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge member fields and methods to be added later as needed
//


var _v = [], _e = [];   // note naming conventions in upload guide


// -----------------------------------------------------------------------
function _main()   
{
      // create a graph (default undirected)
var g = new Graph();

      // set graph properties
g.label = 'Exercise 8.4: 7 (Levitin, 3rd edition)';

g.digraph = true;
      // use global input arrays _v and _e to initialize its internal data structures
g.readGraph(_v, _e);

      // use print_graph() method to check graph
g.printGraph();

      // perform depth-first search and output stored result
g.connectedComp = g.topoSearch(g.connectedComp);
document.write("<p>dfs_push: ", g.dfs_push, "</p>");
g.Counter++; 

      // report connectivity status if available
document.write("<p> ", g.componentInfo(), "</p>");

      // perform bearth-first search and output stored result
g.topoSearch(g.connectedComp);
document.write("<p>bfs_order: ", g.bfs_order, "</p>");

       // output the graph adjacency matrix
g.makeAdjMatrix();
document.write("<p>first row matrix: ", g.adjMatrix[0], "</p>");
document.write("<p>last row matrix: ", g.adjMatrix[g.nv - 1], "</p>");


       // output the DFS-based TC matrix
g.DfsTC();
document.write("<p>TC matrix by DFS:</p>");

  for (var i = 0; i < g.dfsTC.length; i++) 
     {
	document.write(g.dfsTC[i], "</br>");

     }
      // output the warshall matrix

  g.WarshallFloyd();

document.write("<p>TC matrix by Warshall-Floyd:</p>");

   for (var i = 0; i < g.Warshall.length; i++) 
      {
	document.write(g.Warshall[i], "</br>");
      }

      // DAG or not
document.write("<p>DAG: ", g.isDAG(), "</br>");

      //output the floyd matrix
document.write("<p>Distance matrix</p>");
  
   for (var i = 0; i < g.Floyd.length; i++) 
       {
	 document.write(g.Floyd[i], "</br>");
       }
}


// -----------------------------------------------------------------------

function Vertex(v)
{
// published docs section (ref. assignment page)
// for this section, strip line comments
// no JSDOC comments in this section

// base property fields from P1M1

this.label = v.label;  // ... complete from P1M1 (remove comment)


// base member methods from P1M1


// --------------------
// more student fields next


// --------------------
// more student methods next

}

// -----------------------------------------------------------------------

function Edge(vert_i,weight)
{
// published docs section (ref. assignment page)
// for this section, strip line comments
// no JSDOC comments in this section


// base property fields

this.target_v = vert_i;  // ... complete from P1M1 (remove comment)


// base member methods


// --------------------
// more student fields next


// --------------------
// more student methods next

}


// -----------------------------------------------------------------------

function Graph()
{
// published docs section (ref. assignment page)
// for this section, strip line comments
// no JSDOC comments in this section


// base property fields

this.vert = [];
this.nv = 0;  // ... etc. from P1M1 (remove)

this.ne = 0;
this.digraph = false;
this.weighted = false;
this.dfs_push = [];
this.bfs_order = [];
this.label = "";
this.connectedComp = 0;
this.adjMatrix = [];


// base member methods

this.read_graph = better_input;  // ... (complete next)

this.addEdge = addEdgeImpl2;
this.printGraph = printGraphImpl;
this.makeGraph = makeGraphImpl;
this.list_vert = "";
this.dfs = dfsImpl;
this.bfs = bfsImpl;
this.makeAdjMatrix = makeAdjMatrixImpl2;
this.isConnected = isConnectedImpl;
this.componentInfo = componentInfoImpl;
this.topoSearch = topoSearchImpl;

// --------------------
// more student fields next


// --------------------
// more student methods next 

this.Counter = 1;
this.dfsTC = [];
this.Warshall = [];
this.Floyd = [];

// transitive closure package (requirements in line comments, to be removed and replaced by JSDOCs) 

this.hasPath = hasPathImpl; 	                 // boolean, true if path exists between vertices v_i, v_j in digraph
this.shortestPath = shortestPathImpl;              // return distance of shortest path between v_i, v_j in weighted graph 
this.isDAG = isDAGImpl;                      // boolean, true if acyclic digraph
this.warshallFloyd = WarshallFloydImpl;             // inserts .tc field in adjacency matrix if digraph, and .dist if weighted
this.dfsTC =  = DfsTCImpl;                     // return TC matrix for digraph based on a dfs


}


// -----------------------------------------------------------------------
// functions used by methods of Graph and ancillary objects

 function addEdgeImpl(u_i, v_i) 
{

}

function addEdgeImpl2(u_i, v_i, weight) 
{

var u = this.vert[u_i];
var v = this.vert[v_i];

var edge = new Edge(v_i, weight); 

u.insertAdjacent(edge);


if (!this.digraph) 
   {
	edge = new Edge(u_i, weight);
	v.insertAdjacent(edge);
   }
}

function printGraphImpl() 
{

document.write("<p>GRAPH {", this.label, "} ", this.weighted ? "" : "UN", "WEIGHTED, ", this.digraph ? "" : "UN", "DIRECTED - ", this.nv, " VERTICES, ", this.ne, " EDGES:</p>");
document.write("<p> ", this.componentInfo(), "</p>");


for (var i = 0; i < this.nv; i++) 
  {
	var v = this.vert[i];
	document.write("VERTEX: ", i, v.vertexInfo(), "<br>");
  }
}

function better_input(v, e) 
{

  this.nv = v.length;
  this.ne = e.length;


for (var i = 0; i < this.nv; i++) 
  {
	this.vert[i] = new Vertex(v[i]);
  }


for (var j = 0; j < this.ne; j++) 
 {
    this.addEdge(e[j].u, e[j].v, e[j].w);
 }


if (!this.digraph) 
  {
     this.ne = e.length * 2;
  }


if (!(e[0].w == undefined))
 {
	this.weighted = true;
  }

}


// -----------------------------------------------------------------------
// begin student code section
// -----------------------------------------------------------------------

// transitive closure package 

function topoSearchImpl(fun) 
{

var i;

for (i = 0; i < this.nv; i++) 
    {
	this.vert[i].visit = false;
    }

	
for (i = 0; i < this.nv; i++) 
  {
     if (!this.vert[i].visit) 
	{
		this.Counter == 1 ?
			(fun++, this.dfs(i)) : this.bfs(i);
	}
   }
  return fun;
  }


function dfsImpl(v_i) 
{

var w, i;

v = this.vert[v_i];
v.visit = true;
this.dfs_push[this.dfs_push.length] = v_i;

w = v.adjacentByID();
for (i = 0; i < w.length; i++) 
   {
     if (!this.vert[w[i]].visit) 
	{

		this.dfs(w[i]);
	}
   }
}

function bfsImpl(v_i) 
{

// get vertex v by its id
var v = this.vert[v_i];

// process v 
v.visit = true;
this.bfs_order[this.bfs_order.length] = v_i;

// initialize queue with v
var queue = new Queue();
queue.enqueue(v);

// while queue not empty
while (!queue.isEmpty()) 
{ 
  	var u = queue.dequeue();
	var w = u.adjacentByID();
	for (var i = 0; i < w.length; i++) 
	{
		if (!this.vert[w[i]].visit)
		 {
			this.vert[w[i]].visit = true;
			queue.enqueue(this.vert[w[i]]);
			this.bfs_order[this.bfs_order.length] = w[i];
		}
	}
}

}

function makeAdjMatrix()
 {

}

function makeAdjMatrixImpl() 
{

}

// --------------------
function makeAdjMatrixImpl2() 
{


for (var i = 0; i < this.nv; i++) 
{
	this.adjMatrix[i] = [];
	for (var j = 0; j < this.nv; j++) 
	{
		this.adjMatrix[i][j] = 0;
	}
var v = this.vert[i];
	var w = v.adjacentByID();
	var weight = v.adjacent.traverse();
	for (var k = 0; k < w.length; k++) 
	{
		if (!this.weighted)
		 {
			this.adjMatrix[i][w[k]] = 1;
		} else {
			this.adjMatrix[i][w[k]] = weight[k].weight;
		}
	}
}
}

//-------------------
 function isConnectedImpl() 
{
return this.connectedComp == 1;
}


function componentInfoImpl() 
{

if (this.connectedComp == 0) 
{
	return ("no connectivity info");
} else if (this.connectedComp > 1) 
{
	return ("DISCONNECTED " + this.connectedComp);
} else if (this.isConnected)
 {
	return ("CONNECTED");
 }

}

//------------------

function adjacentByIdImpl() 
{

var adjacent_ID = [];
var edge_adj = this.adjacent.traverse();
for (var i = 0; i < edge_adj.length; i++) 
{
	adjacent_ID[i] = edge_adj[i].target_v;
}
return adjacent_ID;
}
//------------------------

function incidentEdgeImpl() 
{

var edgeInfo = []; // Array of object
var w = this.adjacent.traverse(); // get adjacent 
for (var i = 0; i < w.length; i++) 
{
	edgeInfo[i] = {
		adjacency_vert_i: w[i].target_v,
		edge_weight: w[i].weight
	};
}

return edgeInfo;
}

//---------------------------
function vertexInfoImpl()
 {

return ("{" + this.label + "} - VISIT: " + this.visit +
	" - ADJACENCY: " + this.adjacentByID());

}

function makeGraphImpl(n, m, w) 
{

}

//=----------------------
function insertAdjacentImpl(edge)
 {
this.adjacent.insert(edge);
}

//---------------------

function DfsTCImpl()
 {

// (note pattern) for each vertex id
for (var i = 0; i < this.nv; i++)
 {

	// get vertex
	var v = this.vert[i];

	// make all vertices unvisited 
	for (var j = 0; j < this.nv; j++) 
	{
		this.vert[j].visit = false;
	}

	// create + init the corresponding row
	this.dfsTC[i] = [];
	for (var j = 0; j < this.nv; j++) 
	{
		this.dfsTC[i][j] = 0;
	}

var w = v.adjacentByID();
	for (var k = 0; k < w.length; k++) 
	{
		this.dfs(w[k]);
	}

	// for each such node, use to set matrix
	for (var l = 0; l < this.nv; l++) 
	{
		if (this.vert[l].visit) 
		{
			this.dfsTC[i][l] = 1;
		}
	}
}

}
//------------------------

function WarshallFloydImpl() 
{
this.makeAdjMatrix();
// fill Floyd[] and warshall by adjacent matrix 
for (var i = 0; i < this.adjMatrix.length; i++) 
{
	this.Floyd[i] = this.adjMatrix[i].slice();
	this.Warshall[i] = this.adjMatrix[i].slice();

	// check if there is relation between vertices  
	for (var j = 0; j < this.nv; j++)
	 {
		if (this.adjMatrix[i][j] == 0 && (i != j)) 
		{
			this.Floyd[i][j] = Infinity;
		}
	}
}

for (var k = 0; k < this.Warshall.length; k++) 
{
	for (var i = 0; i < this.Warshall.length; i++) 
{
		for (var j = 0; j < this.Warshall.length; j++) 
		{
			this.Warshall[i][j] = (this.Warshall[i][j] ||
				(this.Warshall[i][k] && this.Warshall[k][j])) ? 1 : 0;

			this.Floyd[i][j] =
				Math.min(this.shortestPath(i, j), (this.shortestPath(i, k) + this.shortestPath(k, j)));
		}
	}

}

for (var i = 0; i < this.Floyd.length; i++)
 {
	for (var j = 0; j < this.Floyd.length; j++)
	 {
		if (this.Floyd[i][j] == Infinity) 
		{
			this.Floyd[i][j] = 0;
                 }
	}
}
} 
//-------------------

function hasPathImpl(v_i, v_j) 
{
   return (this.Warshall[v_i, v_j] == 1 ? true : false);
}

function shortestPathImpl(v_i, v_j) 
{
   return (this.Floyd[v_i][v_j]);
}
//----------------------

function isDAGImpl() 
{
for (var i = 0, j = 0; i < this.Warshall.length &&
	j < this.Warshall.length; i++, j++) 
	{
	if (this.hasPath(i, j))
	 {
		return false;
	}
}
return true;
}

// --------------------

function hasPathImpl()
{

}


// -----------------------------------------------------------------------
// published docs section (ref. assignment page)
// use starter6-based P1M1 code as-is (fixes/improvements OK)
// no JSDOC comments in this section (docs already published)
// -----------------------------------------------------------------------

function list_vert()
{

}   // etc.
