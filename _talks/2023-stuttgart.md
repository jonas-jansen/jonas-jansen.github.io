---
layout: talk
title: The gradient-flow structure of non-Newtonian thin-film equations
description: Oberseminar Nichtlineare Differentialgleichungen, Universität Stuttgart 2023
img: 
---

*Oberseminar Nichtlineare Differentialgleichungen, Universität Stuttgart 2023*

### Introduction

We consider a thin liquid film of an
- incompressible $\operatorname{div} u =0$
- viscous
- non-Newtonian $\mu = \mu(\epsilon)$
fluid on a solid bottom such that
- capillary forces dominate.
We assume that the free boundary is given by the graph of a function $h=h(t,x)$


**Assumptions**

- We assume that the aspect ratio $\varepsilon = \frac{H}{L} \ll 1$ is very small. This will allow us to derive a closed equation for the film height $u$ via asymptotic analysis.
- We assume that the problem is one-dimensional, that is that the fluid is homogenenous in $y$-direction.

**Governing equations**

The dynamics of the full problem is given by the Navier-Stokes equations in the moving domain $\Omega(t)$:

$$\left\{
\begin{array}{rcl}
\rho(\partial_t \vec{u} + (\vec{u}\cdot \nabla) \vec{u}) & = & \operatorname{div}\cdot T(p,\vec{u}) \\
\operatorname{div} \vec{u} & = & 0 \\
& \vdots & \\
\text{B.C.}
\end{array}
\right. $$
For simplicity we omit gravitational forces by assuming they are much smaller than the capillary forces.

**Rheology**

- $T=T(p,\vec{u}) = -p\operatorname{Id} + \mu(|D|^2)D$ is Cauchy stress tensor ($D$ is the symmetric gradient)
- shear dependent viscosity $\mu$
	- $\mu\equiv c$ -> Newtonian fluid
	- $\mu' >0$ -> shear-thickening fluid
	- $\mu'<0$ -> shear-thinning fluid
- we will assume that the viscosity is explicitly given by the Ostwald-deWaele law
$$ \mu(\epsilon) = \mu_0|\epsilon|^{\frac{1}{\alpha}-1} $$

**Boundary conditions**

- kinematic boundary condition: $\partial_t h + u_h \partial_x h = u_v$ (particles that are on the boundary remain on the boundary)
- slip condition at solid bottom (e.g. $\vec{u}=0$)
- stress-balance condition: $T(p,\vec{u}) \cdot \vec{n} = \gamma \kappa \vec{n}$, where $\gamma$ is the strength of surface tension, $\kappa$ is the curvature and $\vec{n}$ is the unit outer normal to the free boundary
Idea: surface tension tries to equilibrate surface area (=length) of the surface

$$E_{surface}[h] = \int_{\Omega} \sqrt{1+|\partial_xh(x)}\, \mathrm{d}x \sim |\Omega| + \int_{\Omega}\tfrac{1}{2} |\partial_x h(x)|^2 \, \mathrm{d}x$$

**Lubrication approximation**

Asymptotic expansion in aspect ratio $\varepsilon$ and sending $\varepsilon \searrow 0$, we obtain a closed equation for the film height

$$ \partial_t h + \partial_x\bigl( m(h)|\partial_x^3h|^{\alpha-1} \partial_x^3h \bigr) = 0 $$

### Gradient flows

Gradient flows are evolutionary systems driven by an energy, in the sense that the energy decreases along solutions, as fast as possible.
Clasically,
$$ \dot{x} = - \nabla E[x]$$
and we find that $E$ decreases along solutions
$$ \frac{d}{dt} E[x(t)] = \dot{x}(t) \nabla E[x(t)] = -|\nabla E[x(t)]|^2$$

What does *as fast as possible* mean? This is what is guaranteed by the dissipation mechanism.

Typically, equations have various gradient-flow structures, depending on the choice of energy and dissipation.

**The thin-film equation**

$$\left\{
\begin{array}{rcll}
 \partial_t h + \partial_x\bigl( m(h)|\partial_x^3h|^{\alpha-1} \partial_x^3h \bigr) & = & 0, & t>0,x\in \Omega\\
 \partial_x h = m(h)\partial_x^3 h & = & 0, & t>0,x\in \partial\Omega\\
 h(0,x) & = & h_0(x), & x\in \Omega
\end{array}
\right. $$
Note that solutions conserve their mass (this becomes evident either from modelling or from testing this equation with the function constantly equal to one):
$$ \frac{d}{dt} \int_{\Omega} h(t,x) \, \mathrm{d}x = 0. $$

Then $h$ solves a continuity equation, i.e. there is a flux $j$ such that

$$ \left\{\begin{array}{rcll}
	\partial_t h + \partial_x j & = & 0, &t>0,x\in\Omega \\
	\partial_x h = j & = & 0, & t>0, x\in\partial\Omega.
\end{array}\right. $$

We have hence transformed the problem to finding a pair $(h,j)$ with $j=m(h)\partial_x^3h$.
The capillary effects forces the film to reduce surface energy. This leads to the choice of the energy
$$ E[h] = \int_{\Omega} \tfrac{1}{2} |\partial_x h|^2 \,\mathrm{d} x.$$
Then
$$ \frac{d}{dt} E[h](t) = \int_{\Omega}\partial_{tx} h \partial_x h\, \mathrm{d}x = \underbrace{- \int_{\Omega} \partial_t h\partial_x^2 h \, \mathrm{d} x}_{=\langle DE[h],-\partial_x j\rangle} = \int_{\Omega} \partial_x^2 \partial_x j\, \mathrm{d} x = -\int_{\Omega} \partial_x^3 h j \, \mathrm{d}x.$$

But how does $j$ dissipate energy? We need to choose a dissipation potential. We make the educated guess that $j$ is choosen as the minimiser of the functional

$$ \langle DE[h],-\partial_x j\rangle + \frac{\alpha}{\alpha+1} \int_{\Omega} \frac{|j|^{\frac{\alpha+1}{\alpha}}}{m(h)^{\frac{1}{\alpha}}}\,\mathrm{d} x.$$
Since if $(h,j)$ solve the continuity equation, this implies that (using that $j$ must be a critical point of this equation)
$$ \frac{|j|^{\frac{\alpha}{\alpha+1}-1}j}{m(h)^{\frac{1}{\alpha}}} = -\partial_x DE[h] = \partial_x^3h,$$

and hence
$$ j = m(h)|\partial_x^3 h|^{\alpha-1}\partial_x^3h.$$

Hence, we look for pairs $(h,j)$ that solve the continuity equation and that minimise the dissipation relation.

### Excurse: Positive solutions

Eventually, we want to use this structure to find solutions. But: while for Newtonian thin-film equations, one can show non-negativity of solutions by using entropy methods, this method fails in general for non-Newtonian fluids.

For shear-thinning fluids, Ansini and Giacomelli introduced an additional term in the dissipation to obtain entropy methods for a modified equation. We choose a different approach: since we are working in an energy-driven scheme anyway, we modify the energy to force solutions away from zero: therefore, we introduce a strongly singular potential $G$ with
- $G_{\sigma} \in C^2((0,\infty))$with $G\geq 0$
- $G_{\sigma}$ is convex
- $G_{\sigma}(s)= 0$ for $s\geq 2\sigma$ and $G_{\sigma}(s) \geq s^{-2}$ for $s\leq \sigma$

DRAW PICTURE HERE!

Then, we introduce the new energy
$$ E^{\sigma}[h] = \int_{\Omega} \tfrac{1}{2} |\partial_x h|^2 +G_{\sigma}(h) \, \mathrm{d}x$$

Note that the control of $h$ in $H^1(\Omega)$ gives $h\in C^{1/2}(\Omega)$ and hence $E^{\sigma}[h]<\infty$ implies that $h$ must be strictly positive, since if $h(x_0) = 0$, we would get
$$\int_{x_0}^{x} G_{\sigma}(h)\, \mathrm{d}y \geq \int_{x_0}^{x} |h(y)-h(x_0)|^{-2} \,\mathrm{d} y \geq \int_{x_0}^{x} |x-x_0|^{-1} \,\mathrm{d}y = +\infty.$$

In fact, families with uniformly bounded energy are uniformly bounded below.

We then obtain $DE^{\sigma}[h] = \partial_x^2 h - G_{\sigma}'(h)$ and

$$ j = m(h) |\partial_x^3h - G_{\sigma}''(h)\partial_xh|^{\alpha-1}(\partial_x^3h - G_{\sigma}''(h)\partial_xh).$$


### Minimising-movement scheme

We may use this method to construct solutions. Recall that we look for a pair of solutions $(h,j)$ that satisfies the continuity equation
$$ \left\{\begin{array}{rcll}
	\partial_t h + \partial_x j & = & 0, &t>0,x\in\Omega \\
	\partial_x h = j & = & 0, & t>0, x\in\partial\Omega.
\end{array}\right. $$
and such that infinitesimally $j$ is chosen as the minimiser of the energy-dissipation functional
$$ \frac{d}{dt}E^{\sigma}[h] + \frac{\alpha}{\alpha+1} \int_{\Omega} \frac{|j|^{\frac{\alpha+1}{\alpha}}}{m(h)^{\frac{1}{\alpha}}}\, \mathrm{d} x$$
Integrating in time, we get
$$ E^{\sigma}[h](t_1) + \frac{\alpha}{\alpha+1} \int_{t_0}^{t_1}\int_{\Omega} \frac{|j|^{\frac{\alpha+1}{\alpha}}}{m(h)^{\frac{1}{\alpha}}}\,\mathrm{d}x \,\mathrm{d}s = E^{\sigma}[h](t_0).\tag{1}$$
One typically discretises the time, that is we introduce a minimising-movement scheme. The idea is, that if the system at time $t$ is in a state $h^*$, then after some time $\tau$ the system is in the state $h(t+\tau)$ chosen by following the curve $(h,j)$ solving the discretised continuity equation
$$ \left\{\begin{array}{rcll}
	\frac{h-h^*}{\tau} + \partial_x j & = & 0, &t>0,x\in\Omega \\
	j & = & 0, & t>0, x\in\partial\Omega. \tag{2}
\end{array}\right. $$
and minimising the left-hand side of $(1)$. That is, we look for a minimiser $(h,j)$ of
$$\mathcal{F}^{\sigma}_{\tau,h^*}[h,j] = E^{\sigma}[h] + \tau\tfrac{\alpha}{\alpha+1} \int_{\Omega} \frac{|j|^{\frac{\alpha+1}{\alpha}}}{m(h^*)^{\frac{1}{\alpha}}} \, \mathrm{d} x.\tag{3}$$
Note that we have changed the denominator of the dissipation potential to be evaluated at the previous state $h^*$ to make minimisation easier. It will turn out that solutions are continuous in time, hence this will not cause additional complications.

Then, we can define the *minimising-movement scheme* with time step $\tau>0$:
$$
\begin{split}
h^{\sigma}_{\tau,0} & = 0\\
(h^{\sigma}_{\tau,k},j^{\sigma}_{\tau,k}) & = \text{minimiser of }\mathcal{F}_{\tau,h^{\sigma}_{\tau,k-1}} \text{ among all pairs } (h,j) \text{ solving }(2).
\end{split}
$$
This is a minimisation problem of a strictly convex functional with linear constraint. Unique minimisers exist by the direct method of the calculus of variations. The Euler-Lagrange equation is given by

$$
\left\{
\begin{array}{rcll}
	\frac{h^{\sigma}_{\tau,k+1} - h^{\sigma}_{\tau,k}}{h} + \partial_x j^{\sigma}_{\tau,k+1} & = & 0, & x\in \Omega \\
	\partial_x h^{\sigma}_{\tau,k+1} = j^{\sigma}_{\tau,k+1} & = & 0, & x\in \partial\Omega \\
	j^{\sigma}_{\tau,k+1} & = & m(h^{\sigma}_{\tau,k})|\partial_x^3 h^{\sigma}_{\tau,k+1} - G_{\sigma}''(h^{\sigma}_{\tau,k+1})\partial_x h^{\sigma}_{\tau,k+1}|^{\alpha-1}(\partial_x^3 h^{\sigma}_{\tau,k+1} - G_{\sigma}''(h^{\sigma}_{\tau,k+1})\partial_x h^{\sigma}_{\tau,k+1}), & x\in \Omega
\end{array}
\right.
$$


**Energy-dissipation inequality**

Naively, one obtains the inequality

$$E^{\sigma}[h^{\sigma}_{\tau,k+1}] + \tau\tfrac{\alpha}{\alpha+1} \int_{\Omega} \frac{|j^{\sigma}_{\tau,k+1}|^{\frac{\alpha+1}{\alpha}}}{m(h^{\sigma}_{\tau,k})^{\frac{1}{\alpha}}} \, \mathrm{d} x = \mathcal{F}^{\sigma}_{\tau,h^{\sigma}_{\tau,k}}[h^{\sigma}_{\tau,k+1},j^{\sigma}_{\tau,k+1}] \leq \mathcal{F}^{\sigma}_{\tau,h^{\sigma}_{\tau,k}}[h^{\sigma}_{\tau,k},0] = E^{\sigma}[h^{\sigma}_{\tau,k}]. $$

But we can do better using a trick due to de Giorgi. By convexity of both terms in the energy, we can improve this inequality to give
$$E^{\sigma}[h^{\sigma}_{\tau,k+1}] + \tau \int_{\Omega} \frac{|j^{\sigma}_{\tau,k+1}|^{\frac{\alpha+1}{\alpha}}}{m(h^{\sigma}_{\tau,k})^{\frac{1}{\alpha}}} \, \mathrm{d} x = \mathcal{F}^{\sigma}_{\tau,h^{\sigma}_{\tau,k}}[h^{\sigma}_{\tau,k+1},j^{\sigma}_{\tau,k+1}] \leq \mathcal{F}^{\sigma}_{\tau,h^{\sigma}_{\tau,k}}[h^{\sigma}_{\tau,k},0] = E^{\sigma}[h^{\sigma}_{\tau,k}]. $$
Working with time interpolations of $(u^{\sigma}_{\tau,k})_k$ and $(j^{\sigma}_{\tau,k})_k$. We are now in the position to send $\tau \searrow 0$, since we can obtain the required a-priori estimates from the energy-dissipation inequality.

We find a pair $(h^{\sigma},j^{\sigma})$ such that

$$ \left\{
\begin{array}{rcll}
	\partial_ t h^{\sigma} + \partial_x j^{\sigma} & = & 0, & x\in \Omega \\
	\partial_x h^{\sigma} = j^{\sigma} & = & 0, & x\in \partial\Omega \\
	j^{\sigma} & = & m(h^{\sigma})|\partial_x^3 h^{\sigma} - G_{\sigma}''(h^{\sigma})\partial_x h^{\sigma}|^{\alpha-1}(\partial_x^3h^{\sigma}-G''_{\sigma}(h^{\sigma})\partial_x h^{\sigma}), & x\in \Omega\\
\end{array}
\right.
$$
and 
$$ E^{\sigma}[h^{\sigma}](t_1) + \frac{\alpha}{\alpha+1}\int_{t_0}^{t_1}\int_{\Omega} \frac{|j^{\sigma}|^{\frac{\alpha+1}{\alpha}}}{m(h)^{\frac{1}{\alpha}}} \,\mathrm{d}x \,\mathrm{d}s + \frac{1}{\alpha+1} \int_{t_0}^{t_1}\int_{\Omega} m(h)|\partial_x^3h^{\sigma}-G''_{\sigma}(h^{\sigma})\partial_x h^{\sigma}|^{\alpha+1}\,\mathrm{d}x \,\mathrm{d}s = E^{\sigma}[h^{\sigma}](t_0). \tag{4} $$
The energy-dissipation equality holds for positive solutions due to a trick using Young's inequality and the continuity equation.

In total, we have constructed positive weak solutions to a modified equation.

### Results without modification

In a second step, we want to remove the modification $G_{\sigma}$ from the equation. This can again be obtained by using a-priori estimates due to the energy-dissipation identity $(4)$. Then we can send $\sigma\searrow 0$ and obtain non-negative weak solutions to

$$
\left\{
\begin{array}{rcll}
 \partial_t h + \partial_x\bigl( m(h)|\partial_x^3h|^{\alpha-1} \partial_x^3h \bigr) & = & 0, & t>0,x\in \Omega\\
 \partial_x h = m(h)\partial_x^3 h & = & 0, & t>0,x\in \partial\Omega\\
 h(0,x) & = & h_0(x), & x\in \Omega
\end{array}
\right.
$$
that satisfy and energy-dissipation inequality of the form

$$ \int_{\Omega}\tfrac{1}{2} |\partial_x h(t,x)|^2 \, \mathrm{d}x + \int_0^{t} \int_{\Omega} m(h) |\partial_x^3 h(s,x)|^{\alpha+1} \, \mathrm{d}x \,\mathrm{d}t \leq \int_{\Omega}\tfrac{1}{2} |\partial_x h_0(x)|^2 \, \mathrm{d}x.$$
We may lose equality precisely when the solution becomes zero.



### Lift-off
