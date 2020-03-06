// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - First Edge Object
// 2019, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge member fields and methods to be added later as needed
//
var _v = [], _e = []; // globals used by standard graph reader method


// -----------------------------------------------------------------------
// global caller function, a main() for the caller page
// only function allowed to access global vars


function _main()
{
    // create a graph (default undirected)

    var g = new Graph();


    // set input graph properties (label, directed etc.)

    g.label = "Figure 3.10 (Levitin, 3rd edition)}";


    // use global input arrays _v and _e to initialize its internal data structures

    g.readGraph(_v, _e);

    g.makeAdjMatrix(); //see later


    // use printGraph() method to check graph

    g.printGraph();


    // perform depth-first search and output stored result

    g.connectedComp = g.topoSearch(g.dfs);

    document.write("<p>dfs_push: ", g.dfs_push, "</p>");


    // report connectivity status if available

    document.write(g.componentInfo());


    // perform breadth-first search and output stored result

    g.topoSearch(g.bfs);

    document.write("<p>bfs_order: ", g.bfs_order, "</p>");


    // output the graph adjacency matrix

    document.write("<p>first row matrix: ", g.adjMatrix[0], "</p>");

    document.write("<p>last row matrix: ", g.adjMatrix[g.nv - 1], "</p>");

}


// -----------------------------------------------------------------------
// Edge object constructor

function Edge(vert_i, weight)
{
    this.target_v = vert_i; //id of edge target vertex

    if (!(weight === undefined)) // Edge weight/cost, is null (for unweigted) unless an optional weight parameter was specified when edge was created
    {
        this.weight = weight;
    }
    else
    {
        this.weight = null;
    }

}


// -----------------------------------------------------------------------
// Graph object constructor

function Graph()
{
    this.vert = []; // vertex list (an array of Vertex objects)
    this.nv = 0; // number of vertices
    this.ne = 0; // number of edges
    this.digraph = false; // True if digraph, false otherwise (default undirected)
    this.weighted = false; // True if graph is weighted, false otherwise
    this.dfs_push = []; // DFS order output
    this.bfs_order = []; // BFS order output
    this.label = ""; // identification string to label graph
    this.connectedComp = 0; // Number of connected components (0: no info), is set after a DFS/BFS
    this.adjMatrix = []; // graph adjacency matrix to be created on demand via makeAdjMatrix method.


    // --------------------
    // member methods use functions defined below

    this.listVerts = listVertsImpl; // List graph vertices using info strings returned by Vertex methods
    this.readGraph = better_input; // Graph reader, defaults to internal format
    this.add_edge = addEdgeImpl3; // Insert an edge
    this.printGraph = printGraphImpl; // Print graph information

    this.makeGraph = makeGraphImpl; // Create a random graph, details depend on implementation   
    // not implemented for now
    this.dfs = dfsImpl; // Visit connected vertices depth-first starting at some vertex
    this.bfs = bfsImpl; // Visit connected vertices breadth-first starting at some vertex
    this.makeAdjMatrix = makeAdjMatrixImpl3; // Create adjacency (or weight, if graph weighted) matri
    this.isConnected = isConnectedImpl; // Test if graph is connected returning true, otherwise false


    this.componentInfo = componentInfoImpl; //Get printable connectivity info strings

    /* A search-like topological traversal of graph vertices. This method
    iterates on connected components, calling a specified traversal method
    (e.g., dfs) on each component */
    this.topoSearch = topoSearchImpl;

}


// -----------------------------------------------------------------------
// Vertex object constructor

function Vertex(v)
{
    // user input fields

    this.label = v.label; // vertex can be labelled

    // more fields to initialize internally

    this.visit = false; // vertex can be marked visited or "seen"
    this.adjacent = new List(); // init an adjacency list (see later how to make it private)

    // --------------------
    // member methods use functions defined below

    this.adjacentById = adjacentByIdImpl; // return target id of incident edges in array
    this.incidentEdges = incidentEdgesImpl; // Get information of incident edges in an array of custom objects
    this.insertAdjacent = insertAdjacentImpl; // Insert an edge target vertex in adjacency list. An optional edge weight may also be specified.
    this.vertexInfo = vertexInfoImpl; // Get printable vertex info strings,
}


// -------------------------------------------------------
// Functions used by methods of Graph object. Similar to
// normal functions but use object member fields and
// methods, depending on which object is passed by the
// method call through the self variable: this.
//

//Add an edge from a vertex pair, Obsolete. Use addEdgeImpl3 instead.
function addEdgeImpl(u_i, v_i)
{
    // fetch edge vertices using their id, where u: source vertex, v: target vertex
    var u = this.vert[u_i];
    var v = this.vert[v_i];


    // insert (u,v), i.e., insert v (by id) in adjacency list of u

    u.adjacent.insert(v_i);


    // insert (v,u) if undirected graph (repeat above but reverse vertex order)

    if (!this.digraph)
    {
        v.adjacent.insert(u_i);
    }
}


// Add an edge from a vertex pair and optional weight, Obsolete, use addEdgeImpl3 instead
function addEdgeImpl2(u_i, v_i, weight)
{
    // fetch vertices using their id, where u: edge source vertex, v: target vertex
    var u = this.vert[u_i];
    var v = this.vert[v_i];


    // insert (u,v), i.e., insert v in adjacency list of u
    // (first create edge object using v_i as target, then pass object)

    var v_edge = new Edge(v_i);

    if (!(weight === undefined))
    {

        v_edge.weight = weight;
    }

    u.adjacent.insert(v_edge);


    // insert (v,u) if undirected graph (repeat above but reverse vertex order)

    if (!this.digraph)
    {

        var u_edge = new Edge(u_i);


        if (!(weight === undefined))
        {

            u_edge.weight = weight;

        }

        v.adjacent.insert(u_edge);
    }

}


// Add an edge from a vertex pair and an optional weight. 
// A better implementation which relies on a vertex method to handle adjacency details.

function addEdgeImpl3(u_i, v_i, weight)
{
    // fetch vertices using their id, where u: edge source vertex, v: target vertex
    var u = this.vert[u_i];
    var v = this.vert[v_i];


    // insert (u,v), i.e., insert v in adjacency list of u
    // (first create edge object using v_i as target, then pass object)

    u.insertAdjacent(v_i, weight);


    // insert (v,u) if undirected graph (repeat above but reverse vertex order)

    if (!this.digraph)
    {

        v.insertAdjacent(u_i, weight);
    }
}


// Output graph properties and list its vertices. This function depends on the vertex lister method of the graph.

function printGraphImpl()
{
    document.write("<p>GRAPH {", this.label, "} ", this.weighted ? "WEIGHTED, " : "", this.digraph ? "" : "UN", "DIRECTED - ", this.nv, " VERTICES, ", this.ne, " EDGES:</p>");


    // report connectivity status if available

    document.write(this.componentInfo());


    // list vertices
    this.listVerts();
}


//  Output a vertex list using descriptive strings returned by the Vertex object
function listVertsImpl()
{
    var i, v; // local vars
    for (i = 0; i < this.nv; i++)
    {
        v = this.vert[i];
        document.write("VERTEX: ", i, v.vertexInfo());
    }
}


/*
   Input graph data based on default internal format. Create vertices and corresponding adjacency lists, and set number of
   vertices and edges accordingly. Set a weighted property of graph if an optional weight is specified in input edge list.
   Vertices are auto assigned a numeric id starting from 0 based on position in the input vertex list. 
   Will interpret input edge list as undirected unless the directed property of the graph was set. 
   Only function allowed to break naming convention of method- implementing functions (no Impl suffix).
*/
function better_input(v, e)
{
    // set vertex and edge count fields
    this.nv = v.length;
    this.ne = e.length;

    // input vertices into internal vertex array
    for (var i = 0; i < this.nv; i++)
    {
        this.vert[i] = new Vertex(v[i]);
    }

    //check if the graph is weighted or not
    this.weighted = e[0].w === undefined ? false : true;

    // input vertex pairs from edge list input array
    // remember to pass vertex ids to add_edge()
    for (var i = 0; i < this.ne; i++)
    {
        this.add_edge(e[i].u, e[i].v, e[i].w);
    }

    // double edge count if graph undirected
    if (!this.digraph)
    {
        this.ne = e.length * 2;
    }
}


//Output graph data, Replaced by printGraphImpl
function better_output()
{
    document.write("<p>GRAPH {", this.label, "} ", this.weighted ? "WEIGHTED, " : "", this.digraph ? "" : "UN", "DIRECTED - ", this.nv, " VERTICES, ", this.ne, " EDGES:</p>");


    // report connectivity status if available

    document.write(this.connectedComp == 0 ? '<br> no connectivity info' : "DISCONNECTED: ".concat(this.connectedComp));


    // list vertices
    this.listVerts();
}


/*
   Implement a versatile caller for search-like topological traversals of vertices (initially support DFS and BFS). 
   Updates and returns the number of connected components. 
   Stores the id of vertices in visit order in dfs_push or bfs_order depending on requested search.
*/
function topoSearchImpl(fun)
{
    connectedComp = 0;

    // mark all vertices unvisited
    for (var i = 0; i < this.nv; i++)
    {
        this.vert[i].visit = false;
    }

    // traverse unvisited connected components
    for (var i = 0; i < this.nv; i++)
    {
        if (!this.vert[i].visit)
        {
            fun == this.dfs ? this.dfs(i) : this.bfs(i);

            connectedComp++;
        }
    }

    return connectedComp;

}


// Recursively traverse a connected component depth-first starting at passed vertex. 
// Inserts visited vertex id in visit order in dfs_push.

function dfsImpl(v_i)
{
    // get landing vert by id then process
    var v = this.vert[v_i];
    v.visit = true;
    len = this.dfs_push.length;
    this.dfs_push[len] = v_i;

    // recursively traverse unvisited adjacent vertices
    var w = v.adjacentById();
    for (var j = 0; j < w.length; j++)
    {
        if (!this.vert[w[j]].visit)
        {
            this.dfs(w[j]);
        }
    }
}


// Traverse a connected component breadth-first starting at passed vertex.
// Inserts visited vertex id in visit order in bfs_order.
function bfsImpl(v_i)
{
    // get vertex v by its id
    var v = this.vert[v_i];

    // process v 
    v.visit = true;

    // initialize queue with v
    var q = new Queue();
    q.enqueue(v_i);


    // while queue not empty
    while (!q.isEmpty())
    {

        // dequeue and process a vertex, u
        var u_i = q.dequeue();
        var u = this.vert[u_i];
        this.bfs_order[this.bfs_order.length] = u_i; //fill the bfs_order array when dequeu the vertex


        // queue all unvisited vertices adjacent to u
        var w = u.adjacentById();
        for (var i = 0; i < w.length; i++)
        {
            if (!this.vert[w[i]].visit)
            {
                this.vert[w[i]].visit = true;
                q.enqueue(w[i]);
            }
        }
    }
}


// Generate adjacency matrix representation of graph 
// obsolete, use makeAdjMatrixImpl3 instead. 
// This function doesn't support weighted edges, and is not coded optimally.

function makeAdjMatrixImpl()
{
    // initially create row elements and zero the adjacency matrix
    for (var i = 0; i < this.nv; i++)
    {

        this.adjMatrix[i] = [];

        for (var j = 0; j < this.nv; j++)
        {
            this.adjMatrix[i][j] = 0;
        }

        // for each vertex, set 1 for each adjacent  

        var w = this.vert[i].adjacentById();

        for (var j = 0; j < w.length; j++)
        {
            this.adjMatrix[i][w[j]] = 1;
        }
    }
}


// Generate adjacency matrix representation of graph 
// obsolete, use makeAdjMatrixImpl3 instead. better encapsulation can be applied.

function makeAdjMatrixImpl2()
{
    // initially create row elements and zero the adjacency matrix
    for (var i = 0; i < this.nv; i++)
    {

        this.adjMatrix[i] = [];

        for (var j = 0; j < this.nv; j++)
        {
            this.adjMatrix[i][j] = 0;
        }

        // for each vertex, set 1 for each adjacent if unweighted, its weight if graph is weighted
        var adj = this.vert[i].adjacent.traverse();
        for (var j = 0; j < adj.length; j++)
        {
            var edge = adj[j];
            this.adjMatrix[i][edge.target_v] = this.weighted ? edge.weight : 1;
        }
    }
}


/*Generate an adjacency matrix from internal adjacency lists. A weight (or
   weighted adjacency) matrix is produced if graph is weighted.*/
function makeAdjMatrixImpl3()
{
    for (var i = 0; i < this.nv; i++)
    {

        this.adjMatrix[i] = [];

        for (var j = 0; j < this.nv; j++)
        {
            this.adjMatrix[i][j] = 0;
        }

        // for each vertex, set 1 for each adjacent if unweighted, its weight if graph is weighted
        var enodes = this.vert[i].incidentEdges();
        for (var j = 0; j < enodes.length; j++)
        {
            var edge_node = enodes[j];
            this.adjMatrix[i][edge_node.adjVert_i] = this.weighted ? edge_node.edgeWeight : 1;
        }
    }
}


// Return connected status based on internal connectivity field
function isConnectedImpl()
{
    this.connectedComp = this.topoSearch(this.dfs); //Do topological search (DFS, or BFS) for the graph to set the number of connected components if not set
    return this.connectedComp == 1; //The graph is connected if it has only one connected component
}


// Report connectivity information if available
function componentInfoImpl()
{
    return this.connectedComp == 0 ? 'no connectivity info<br><br>' : "DISCONNECTED: ".concat(this.connectedComp, '<br>');
}


// Get id of adjacent vertices in an array
function adjacentByIdImpl()
{
    var traversal = this.adjacent.traverse();

    var traversal_array = [];

    for (var i = 0; i < traversal.length; i++)
    {
        traversal_array[i] = traversal[i].target_v;
    }

    return traversal_array;
}


/* Get information of edges incident to a vertex, to be returned in an array of special output objects
   each of which contains information from an edge node in the vertex adjacency list. */

function incidentEdgesImpl()
{
    var edges = this.adjacent.traverse(); //get array of incident edges objects

    var edges_info = [];

    for (var i = 0; i < edges.length; i++)
    { //create an array of json objects which contains edge information.
        edges_info[i] = {
            adjVert_i: edges[i].target_v,
            edgeLabel: "",
            edgeWeight: edges[i].weight
        };
    }

    return edges_info;
}


//Get vertex details in a printable string
function vertexInfoImpl()
{
    var info = "".concat(" {", this.label, "} - VISIT: ", this.visit, " - ADJACENCY: ", this.adjacentById(), "<br>");

    return info;

}


/*Insert a new edge node in the adjacency list of vertex. 
  It updates the internal adjacency list representation.*/
function insertAdjacentImpl(v_i, weight)
{
    this.adjacent.insert(new Edge(v_i, weight));
}


//not implemented now
function makeGraphImpl()
{
}