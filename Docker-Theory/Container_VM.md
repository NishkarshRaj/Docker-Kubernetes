# Containers versus Virtual Machines

**1. OS:** Virtual Machines use their own guest OS over the Hypervisor on parent OS while containers directly use the parent OS.

**2. Booting time:** Minutes for VM but seconds for containers

**3. Snapshots versus Images:** VM snapshots are static while images can be modified and layered.

**4. Version Controlled:** Docker images can be version controlled like Git using DockerHub repositories.

**5. Multiplicity:** One Iso file may launch only one VM at a time but one docker image can launch multiple containers at once.
